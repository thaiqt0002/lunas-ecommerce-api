FROM node:20-alpine as BASE
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Build Image

FROM node:20-alpine as BUILD
WORKDIR /app
COPY --from=BASE /app/node_modules ./node_modules
COPY . .
RUN npm run build \
    && rm -rf node_modules \
    && npm install --prod --frozen-lockfile


# Build production
FROM node:20-alpine as PROD
WORKDIR /app
COPY --from=BUILD /app/node_modules ./node_modules
COPY --from=BUILD /app/dist ./dist

EXPOSE 9000
CMD ["node", "dist/main"]