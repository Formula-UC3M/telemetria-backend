#!/bin/sh
npm install
npm run lint
npm run test

[ -e telemetria-frontend ] && rm -rf telemetria-frontend
git clone --depth 1 https://github.com/Formula-UC3M/telemetria-frontend.git
cd telemetria-frontend
npm install
npm run lint
npm test
npm run build
[ -e dist ] && mv dist/ ../public/

# Back to origin
cd ..
