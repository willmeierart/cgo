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
