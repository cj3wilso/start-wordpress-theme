# README #

### How do I get set up? ###

#### Setting up new theme
Open style.css, gulpfile.js and functions.php to update theme name and text domain. 
In style.css you'll need to reference correct parent theme under *template*

If using a new parent theme: Open /includes/enqueue.php and find function *main_scripts*
Then find *$parenthandle* and update to name of parent theme folder under themes

Open up terminal in SourceTree and type:
```
npm init
npm install gulp@4.0.2
npm install gulp-dart-sass --save-dev; npm install gulp-concat --save-dev; npm install gulp-concat-util --save-dev; npm install gulp-uglify --save-dev; npm install browser-sync --save-dev; npm install gulp-rename --save-dev; npm install gulp-imagemin --save-dev; npm install imagemin-webp --save-dev; npm install gulp-ext-replace --save-dev; npm install gulp-minify --save-dev; npm install gulp-babel --save-dev;
```

####Working on website
Open PHP, SASS and JavaScript files in code editor of your choice
To work on JavaScript and SASS files you'll need to run gulp
Run gulp by opening SourceTree terminal (upper right hand corner) and write:
```
gulp
```
This will watch for any changes to your SASS and JavaScript files and compile them right away which you can then view in your localhost browser:
*http://localhost/aoleoils/*

Working on JavaScript files go to *assets/js/src*. Any new files created will automatically be minified into script-min.js located at *assets/js/script-min.js*

Working on CSS files happens in SASS folder *assets/sass*. Any new files created will need to be added to the *assets/sass/style.scss* file or else it won't load new changes. Oftentimes I need to close SourceTree terminal and start it up again with *gulp* to get changes to show.

Create JavaScript and SASS files based on modules.

####Deploy to server
ALWAYS WORK IN DEVELOP BRANCH
After you've finished making changes to code, commit changes but do not push
Open up SourceTree terminal (upper right hand corner) and start SSH agent:
```
eval `ssh-agent -s`
```
Add Christine agent from this file:
```
ssh-add /Users/RJABBAR/cj3wilso
ssh-add C:/Users/Christine/cj3wilso
```

You are meant to deploy develop branch to staging server and master branch to production server
If you made changes in the develop branch, move those changes to the staging server like this:
```
git push server-staging develop
```
If you made changes in the master branch, move those changes to the production server like this:
```
git push server-production master
```

View changes on website here:
*https://staging.aoloeoils.com/*

####Deploy to Bitbucket
After you've finished making changes to code, commit changes but do not push
Press *Push* button (upper left corner) which will open up a window
*Push to repository* choose *origin*
Check off develop branch and select button *Push*
After you push to origin, you can't push these files to the server, so the order is important.
 
* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
