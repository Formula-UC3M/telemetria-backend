#!/bin/sh
cd ./server
npm install
npm run lint
npm run test

cd ../client
npm i
npm run lint
npm test
