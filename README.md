# Assets 

Assets repository for common web resources: 

* Images
* Stylesheets 
* HTML pages (404, 500...)

Available from [https://apisense.github.io/web-assets](https://apisense.github.io/web-assets).

# Local dev

From root directory, use ```python -m SimpleHTTPServer``` to serve local dev. See results on [localhost:8000](localhost:8000).  

In html directory (local dev only), you can use relative path (ex: "href='../images/apisense.png'") but before deploy you have to change them to absolute path. To do that, use the command ```grant``` (get it with ```npm install```). You will get compiled files in the dist directory (but it's just to check if all goes well). Anyway jenkins will to the job for you.

Use ```grunt``` tasks to get feedback:

- ```grunt watch``` => hot compile for js and css files
- ```grunt test``` => run tests in /javascripts/tests/unit/*
- ```grunt dist``` => compile html, js and css + inflate zip file ready to deploy

# Deploy

Just use ```./deploy.sh``` on master branch. The script will handle the push of valuable data on `gh-pages`.
