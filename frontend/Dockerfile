# Dockerfile = 제미나이에 의해 작성됨

# =========================================
# Stage 1: 의존성 설치 (Dependencies)
# =========================================
# 알파인 리눅스 기반의 Node.js 20 이미지를 기반으로 시작
FROM node:20-alpine AS deps

# 앱 디렉토리 설정
WORKDIR /app

# package.json과 lock 파일을 먼저 복사하여 의존성 레이어 캐싱 활용
COPY package.json yarn.lock* pnpm-lock.yaml* package-lock.json* ./

# npm을 사용하는 경우
RUN npm install

# =========================================
# Stage 2: 애플리케이션 빌드 (Builder)
# =========================================
FROM node:20-alpine AS builder

WORKDIR /app

# 이전 단계(deps)에서 설치한 node_modules를 복사
COPY --from=deps /app/node_modules ./node_modules
# 소스 코드를 복사
COPY . .

# Next.js 원격 측정 비활성화
ENV NEXT_TELEMETRY_DISABLED=1

# 프로덕션 빌드 실행 (이때 next.config.mjs의 output: 'standalone' 설정이 사용됨)
RUN npm run build

# =========================================
# Stage 3: 프로덕션 이미지 (Runner)
# =========================================
FROM node:20-alpine AS runner

WORKDIR /app

# 프로덕션 환경 변수 설정
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Next.js가 사용할 기본 포트 설정
ENV PORT=3000

# 빌드 단계(builder)에서 생성된 standalone 폴더를 복사
COPY --from=builder /app/.next/standalone ./

# 빌드 단계에서 생성된 public 폴더와 static 에셋을 복사
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# 3000번 포트를 외부에 노출
EXPOSE 3000

# 컨테이너 실행 시 서버 시작 명령어
# standalone 모드는 'server.js' 파일을 생성하여 서버를 실행
CMD ["node", "server.js"]