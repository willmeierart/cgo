## LINUX COMMANDS:
*remote-to-local (theme only):*
  rsync -av kp0641570666030@45.40.149.159:/home/kp0641570666030/html/wp-content/themes/CGO/ /Users/w/var/www/centerofthegoldenone.com/www/wp-content/themes/CGO
*local-to-remote (theme only):*
  rsync -av --exclude-from=/Users/w/var/www/centerofthegoldenone.com/www/wp-content/themes/CGO/.gitignore /Users/w/var/www/centerofthegoldenone.com/www/wp-content/themes/CGO/ kp0641570666030@45.40.149.159:/home/kp0641570666030/html/wp-content/themes/CGO
*reset ssh when REMOTE HOST IDENTIFICATION HAS CHANGED warning happens:*
  ssh-keygen -R "45.40.149.159"

## CGO events API:
+ **endpoint: *http://104.130.1.140/data/:query***
+ queries:
  + LocationAreas: Returns a list of all active areas.
  + Locations/?area=[locationAreaId]: Returns a list of all locations for the specified area. Area is required.
  + CourseTypes: Returns a list of all course types.
  + SampleError: Returns a sample error message.
  + Events/?loc=[locationId]&type=[courseTypeId]&start=[DateTime]&end=[DateTime]: Returns a list of events. All parameters are optional. If start and end aren't specified the system will set start to now and end to the end of the year.


## TO-DO:
[] at the end of the project, delete any unused files, remove enqueue'ing
  [] refactor for shared assets


rsync -av kp0641570666030@45.40.149.159:/home/kp0641570666030/html/wp-content/plugins/
/Users/w/var/www/centerofthegoldenone.com/www/wp-content/plugins



Potential issue down the road:
via moment console warning 06/21/2018:
```Deprecation warning: value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.
Arguments: 
[0] _isAMomentObject: true, _isUTC: false, _useUTC: false, _l: undefined, _i: 07-19-2018, _f: undefined, _strict: undefined, _locale: [object Object]```
