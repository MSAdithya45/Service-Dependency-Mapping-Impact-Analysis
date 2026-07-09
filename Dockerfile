# -----------------------------
# Stage 1 - Dependencies
# -----------------------------
FROM node:22-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci


# -----------------------------
# Stage 2 - Builder
# -----------------------------
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

RUN npx prisma generate


# -----------------------------
# Stage 3 - Production
# -----------------------------
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

RUN addgroup -S nodejs && \
    adduser -S appuser -G nodejs

USER appuser

EXPOSE 5000

CMD ["npm","start"]