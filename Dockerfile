# 베이스 이미지 설정
FROM node:22.15-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# pnpm 활성화
RUN corepack enable pnpm

# pnpm만 사용하므로 pnpm 관련 파일만 복사
COPY package.json pnpm-lock.yaml .npmrc* ./

# pnpm으로 의존성 설치
RUN pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# pnpm 활성화
RUN corepack enable pnpm

# 의존성과 소스 코드 복사
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js 빌드 실행
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# pnpm 활성화
RUN corepack enable pnpm

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 시스템 사용자 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# package.json과 pnpm-lock.yaml 복사
COPY package.json pnpm-lock.yaml ./

# 프로덕션 의존성만 설치
RUN pnpm i --frozen-lockfile --prod

# 필요한 파일들 복사
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# .next 디렉토리 권한 설정
RUN chown -R nextjs:nodejs .next

USER nextjs

EXPOSE 3000

ENV PORT=3000

# Next.js 애플리케이션 실행
CMD ["pnpm", "start"]