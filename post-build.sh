#!/bin/sh

[ -d ./web ] || mkdir web
cp -R -v ./platforms/browser/www/* ./web