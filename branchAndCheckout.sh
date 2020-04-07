#!/bin/bash
#https://www.sitepoint.com/quick-tip-synch-a-github-fork-via-the-command-line/

echo $1
if [ "$#" -ne 1 ]; then
    echo "Illegal number of parameters"
        exit 1
fi
echo "git branch " $1
git branch $1
echo "git checkout " $1
git checkout $1
echo "git push --set-upstream origin " $1
git push --set-upstream origin $1
