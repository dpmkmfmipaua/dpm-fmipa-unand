# ============================================
# DPM KM FMIPA UNAND - Production Dockerfile
# ============================================

# 1. Gunakan Node.js Alpine (ringan, ~50MB)
FROM node:18-alpine

# 2. Install dependencies untuk health check
RUN apk add --no-cache curl

# 3. Set working directory
WORKDIR /usr/src/app

# 4. Copy package files dulu (untuk Docker layer caching)
COPY package*.json ./

# 5. Install dependencies dengan npm ci (lebih strict & reproducible)
RUN npm ci --only=production

# 6. Copy seluruh source code
COPY . .

# 7. Buat non-root user untuk security (PENTING!)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /usr/src/app

USER nodejs

# 8. Expose port
EXPOSE 3000

# 9. Health check endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# 10. Start application
CMD ["node", "server.js"]