http://yeoman.io/

grunt :  server
grunt-contrib-clean
bower : package manager

sublime

isolated scope 

angular watch
compass
box sizing
sprite
mixin


npm install -g yo
npm install -g generator-angular(npm install -g generator-webapp)
mkdir my-new-project && cd $_
yo angular [app-name] (yo webapp)
bower install angular-ui     (eg)



npm install -g generator-angular  # install generator
yo angular                        # scaffold out a AngularJS project
bower install angular-ui          # install a dependency for your project from Bower
grunt test                        # test your app
grunt serve                       # preview your app (formerly `grunt server`)
grunt                             # build the application for deployment

npm install yo -g
npm install generator-webapp -g
yo webapp
grunt server
grunt (only to build)
npm install -g generator-angular
yo angular

*************************************************************8
cd /new/project/directory
(Optional) Update NPM
npm update -g npm
Install angular scaffold
npm install -g generator-angular
Run yeoman scaffold
yo angular
Fire up a server
grunt server
Start building your app, perhaps with Angular sub-generators
yo angular:controller myController
yo angular:directive myDirective
yo angular:filter myFilter
yo angular:service myService
****************************************************************

installs Yeoman, Grunt and Bower
npm install -g yo grunt-cli bower


sass site to nstall compass
http://thesassway.com/beginner/getting-started-with-sass-and-compass

2015
Goto : yeoman.io/codelab/setup.html
and follow all the steps to install GIT, node, npm, yo, bower, and grunt

to resolve dependencies from github when behind firewalls replase git  with https using below commands
git config --global url."https://".insteadOf git://
git config --global url."https".insteadOf git

Use below command to create new controller and respective binding at one go.
yo angular:route routeName

//File upload plugins
https://github.com/nervgh/angular-file-upload/
https://github.com/leon/angular-upload
https://github.com/uor/angular-file
https://github.com/danialfarid/angular-file-upload
https://github.com/twilson63/ngUpload


//Angular Directive Tutorial
//https://docs.angularjs.org/guide/directive

//For executing and testing the code without local environment.
//http://jsfiddle.net/
//https://docs.angularjs.org/guide/providers
//https://docs.angularjs.org/guide/services





####Linux
use below command to be able to scafold the angular app using yo
chmod g+rwx /root /root/.config /root/.config/configstore