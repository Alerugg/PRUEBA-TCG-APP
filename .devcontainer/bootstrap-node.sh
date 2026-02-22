#!/usr/bin/env bash
set -euo pipefail

if command -v npm >/dev/null 2>&1; then
  echo "npm already available: $(npm -v)"
  exit 0
fi

echo "npm not found. Attempting to install Node.js + npm..."

install_with_apt() {
  apt-get update
  DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends nodejs npm
}

install_with_apk() {
  apk add --no-cache nodejs npm
}

install_with_dnf() {
  dnf install -y nodejs npm
}

install_with_yum() {
  yum install -y nodejs npm
}

if command -v apt-get >/dev/null 2>&1; then
  install_with_apt
elif command -v apk >/dev/null 2>&1; then
  install_with_apk
elif command -v dnf >/dev/null 2>&1; then
  install_with_dnf
elif command -v yum >/dev/null 2>&1; then
  install_with_yum
else
  echo "No supported package manager found. Installing Node.js from binaries..."
  ARCH="$(uname -m)"
  case "$ARCH" in
    x86_64) NODE_ARCH="x64" ;;
    aarch64|arm64) NODE_ARCH="arm64" ;;
    *) echo "Unsupported architecture: $ARCH"; exit 1 ;;
  esac

  NODE_VERSION="v20.19.5"
  TMP_DIR="$(mktemp -d)"
  trap 'rm -rf "$TMP_DIR"' EXIT

  curl -fsSL "https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}-linux-${NODE_ARCH}.tar.xz" -o "$TMP_DIR/node.tar.xz"
  tar -xJf "$TMP_DIR/node.tar.xz" -C /usr/local --strip-components=1
fi

echo "Installed Node: $(node -v)"
echo "Installed npm: $(npm -v)"
