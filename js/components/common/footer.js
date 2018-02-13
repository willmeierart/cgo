jQuery(document).ready(function($) { 
  const isThin = $(window).width() <= 1000
  const clonedMenu = isThin ? $({
        ...$('.mobile-only .menu').clone()
      }) : $({ ...$('nav .sf-menu').clone() })
})
