FROM node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
COPY prisma ./prisma

RUN npm run build

FROM node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293 AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/generated ./src/generated

# Prisma 7 resolves the schema location and datasource url from prisma.config.ts,
# and the schema itself lives under prisma/. The CI health-check runs
# `prisma db push` inside this image, so both must be present in the runtime stage
# (dotenv is a runtime dependency, so prisma.config.ts loads fine).
COPY prisma ./prisma
COPY prisma.config.ts ./

EXPOSE 3001

CMD ["npm", "start"]
