#!/bin/sh
rm -r paperclips
mkdir paperclips
cd paperclips

wget -m http://www.decisionproblem.com/paperclips/

mkdir -p docs
mv www.decisionproblem.com/paperclips/* docs
rm -rf www.decisionproblem.com
find . -name '*\?*' | while read -r path ; do
    mv "$path" "${path%\?*}"
done

cd ..

diff -crB paperclips/docs/ ./ > dfile.patch
