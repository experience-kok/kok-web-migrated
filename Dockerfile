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

# 🔑 중요: NODE_ENV를 먼저 설정 (환경 변수 로딩보다 우선)
ENV NODE_ENV=production

# 🔑 중요: 모든 파일을 복사 (환경 파일들 포함)
COPY . .

# Next.js telemetry 비활성화 (선택사항)
ENV NEXT_TELEMETRY_DISABLED=1

# 🔧 디버깅: 환경 변수와 파일 존재 확인 (선택사항 - 문제 해결 후 제거 가능)
RUN echo "=== 환경 변수 확인 ==="
RUN echo "NODE_ENV: $NODE_ENV"
RUN echo "=== 환경 파일 존재 확인 ==="
RUN ls -la .env*
RUN echo "=== .env.production 내용 확인 ==="
RUN head -5 .env.production || echo ".env.production 파일을 읽을 수 없습니다"

# pnpm으로 빌드 (이제 .env.production이 자동으로 로드됨)
RUN corepack enable pnpm && pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# 환경 변수 설정
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 사용자 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 퍼블릭 파일 복사
COPY --from=builder /app/public ./public

# 🔑 환경 파일들 복사 (런타임에서도 접근 가능하도록)
COPY --from=builder /app/.env* ./

# Next.js standalone 빌드 산출물 복사
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 소유권 변경
USER nextjs

# 포트 설정
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 🔧 런타임 디버깅 (선택사항 - 문제 해결 후 제거 가능)
RUN echo "=== 최종 파일 구조 ==="
RUN ls -la

# server.js는 Next.js standalone 빌드 결과물에 포함됨
CMD ["node", "server.js"]