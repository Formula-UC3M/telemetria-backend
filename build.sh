#!/bin/sh
cd ./server
npm install
npm run test
npm run lint

cd ../client
npm i
npm run lint
npm test
