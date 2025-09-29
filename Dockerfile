# 베이스 이미지
FROM node:22.15-alpine AS runner
WORKDIR /app

# 환경 변수
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 사용자 생성
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# 🔑 Jenkins에서 빌드된 산출물만 복사
COPY --chown=nextjs:nodejs .next/standalone ./ 

# 권한 변경
USER nextjs

# 포트 설정
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 실행
CMD ["node", "server.js"]
