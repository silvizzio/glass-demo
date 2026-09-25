#!/usr/bin/env bash
set -euo pipefail

project_root="$HOME/Documents/Vizzio/Git"
mkdir -p "$project_root"
cd "$project_root"

if [ -d glass-demo/.git ]; then
  cd glass-demo
  git pull --ff-only
elif [ -e glass-demo ]; then
  echo "The path $project_root/glass-demo already exists and is not a Git checkout." >&2
  exit 1
else
  git clone https://github.com/silvizzio/glass-demo.git
  cd glass-demo
fi

if ! command -v node >/dev/null 2>&1; then
  echo 'Install Node.js 20.9+ first: https://nodejs.org/' >&2
  exit 1
fi

npm install
echo 'Open http://localhost:3000 in Chrome.'
npm run dev
