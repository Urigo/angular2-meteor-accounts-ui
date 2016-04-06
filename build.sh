#!/bin/sh
webpack
cp ./build/modules/*.d.ts ./build/
rm -rf ./build/modules
git add ./build/*
