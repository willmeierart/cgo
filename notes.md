## LINUX COMMANDS:
*remote-to-local (theme only):*
  rsync -av kp0641570666030@45.40.149.159:/home/kp0641570666030/html/wp-content/themes/CGO/ /Users/w/var/www/centerofthegoldenone.com/www/wp-content/themes/CGO
*local-to-remote (theme only):*
  rsync -av --exclude-from=/Users/w/var/www/centerofthegoldenone.com/www/wp-content/themes/CGO/.gitignore /Users/w/var/www/centerofthegoldenone.com/www/wp-content/themes/CGO/ kp0641570666030@45.40.149.159:/home/kp0641570666030/html/wp-content/themes/CGO
*reset ssh when REMOTE HOST IDENTIFICATION HAS CHANGED warning happens:*
  ssh-keygen -R "45.40.149.159"


## TO-DO:
[] figure out hot module reloading speed
[] make sure Ben/Bruce are going to get the data model going correctly
[x] get full dynamic page structure with fake data
[] figure out how to make that work with copying each page for each type of offering
[] once we get design assets meet with nick and start scaffolding large-scale principles
[] handle redirect of offerings page to offerings/meditation instead of dynamic content

### ONGOING:
[] keep Asana up-to-date

### Specific code issues:
[x] recursive call to update events

#### Questions for Jeremy:
[x] how to handle overflow of elements?
  [x] like menu items but also the event-type-description-expand btns
