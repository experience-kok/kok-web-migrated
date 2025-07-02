# 베이스 이미지 설정
FROM node:22.15-alpine AS base
# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
# pnpm만 사용하므로 pnpm 관련 파일만 복사
COPY package.json pnpm-lock.yaml .npmrc* ./
# pnpm으로 의존성 설치
RUN corepack enable pnpm && pnpm i --frozen-lockfile
# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# :전구: .env.production 파일 복사
COPY .env .env.production
# Next.js telemetry 비활성화 (선택사항)
# ENV NEXT_TELEMETRY_DISABLED=1
# pnpm으로 빌드
RUN corepack enable pnpm && pnpm run build
# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# 퍼블릭 파일 복사
COPY --from=builder /app/public ./public
# :전구: .env.production 파일 복사 (최종 이미지에 포함)
COPY --from=builder /app/.env.production .env.production
# Next.js standalone 빌드 산출물 복사
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
# server.js는 Next.js standalone 빌드 결과물에 포함됨
CMD ["node", "server.js"]