# syntax=docker/dockerfile:1

FROM golang:alpine@sha256:e6898559d553d81b245eb8eadafcb3ca38ef320a9e26674df59d4f07a4fd0b07 AS base
ENV CGO_ENABLED=0
RUN apk add --no-cache file git
WORKDIR /src

FROM base AS build
RUN --mount=type=bind,target=/src \
    --mount=type=cache,target=/root/.cache/go-build \
    go build -ldflags "-s -w" -o /usr/bin/app .

FROM scratch AS binary
COPY --from=build /usr/bin/app /bin/app

FROM alpine AS image
COPY --from=build /usr/bin/app /bin/app
EXPOSE 8080
ENTRYPOINT ["/bin/app"]
