## LINUX COMMANDS:
*remote-to-local (theme only):*
  rsync -av kp0641570666030@45.40.149.159:/home/kp0641570666030/html/wp-content/themes/CGO/ /Users/w/var/www/centerofthegoldenone.com/www/wp-content/themes/CGO
*local-to-remote (theme only):*
  rsync -av --exclude-from=/Users/w/var/www/centerofthegoldenone.com/www/wp-content/themes/CGO/.gitignore /Users/w/var/www/centerofthegoldenone.com/www/wp-content/themes/CGO/ kp0641570666030@45.40.149.159:/home/kp0641570666030/html/wp-content/themes/CGO
*reset ssh when REMOTE HOST IDENTIFICATION HAS CHANGED warning happens:*
  ssh-keygen -R "45.40.149.159"


## TO-DO:
[] figure out hot module reloading speed (actually an issue with ipv6 / dns lookup most likely)
[x] make sure Ben/Bruce are going to get the data model going correctly
each page for each type of offering
[x] once we get design assets meet with nick and start scaffolding large-scale principles
[] responsive styling


[] at the end of the project, delete any unused files, remove enqueue'ing
  [] refactor for sahred assets

### ONGOING:
[] keep Asana up-to-date

### Specific code issues:

#### Questions for Jeremy:
[] how to handle menu / submenus (especially on mobile) ?
[] what should be a link elsewhere (images, text, etc)
