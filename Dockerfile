# ── build stage ──────────────────────────────────────────────────────────────
FROM node:22-slim AS builder
WORKDIR /app

COPY package.json package-lock.json tsconfig.base.json ./
COPY packages/core/package.json packages/core/
COPY packages/server/package.json packages/server/
COPY packages/web/package.json packages/web/
RUN npm ci

COPY packages ./packages
RUN npm run build

# ── runtime stage ─────────────────────────────────────────────────────────────
FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY packages/core/package.json packages/core/
COPY packages/server/package.json packages/server/
COPY packages/web/package.json packages/web/
RUN npm ci --omit=dev

COPY --from=builder /app/packages/core/dist packages/core/dist
COPY --from=builder /app/packages/server/dist packages/server/dist
COPY --from=builder /app/packages/web/dist packages/web/dist

# Source checkouts on some filesystems (e.g. exFAT) carry 600 modes; make
# everything world-readable so the non-root user can serve it.
RUN chmod -R a+rX /app

ENV PORT=3000
EXPOSE 3000
USER node
CMD ["node", "packages/server/dist/index.js"]
