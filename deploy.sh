#!/bin/sh

# variables
dist="dist/compile"
folders="html images stylesheets"

npm update --user
grunt
git checkout gh-pages
for folder in $folders
do
    echo "Deploying content for $folder"
    rm -rf -- ./$folder
    cp -r $dist/$folder $folder
    git add $folder
done

git commit -m "feat: New content release"
git push
git checkout master
