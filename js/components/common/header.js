jQuery(document).ready(function($) { 
  const clonedMenu = $('nav .sf-menu').clone()
  let menuIsOpen = false

  const replaceEntireHeader = () => {
    $('#top').children('.container').replaceWith(`
      <div class='az-header-container'>
        <div class='header-title'></div>
        <div class='nav-btn-wrapper'>
          <div id='nav-btn'>
            <span class='line'></span>
            <span class='line'></span>
            <span class='line'></span>
            <span class='line'></span>
          </div>
        </div>
        <div id='side-nav'>
          <div class='side-nav-inner'></div>
        </div>
      </div>
    `)
    $('.side-nav-inner').append(clonedMenu)
  }
  
  const formatLogo = () => {
    const titleSection = $('.az-header-container .header-title')
    const logo = '✧'
    titleSection.empty()
    titleSection.append(`
      <div id='cgo-logo'>${logo}</div>
    `)
    titleSection.append(`
      <div class='title-wrapper'>
        <a href='/'>
          <div class='center-of'>CENTER OF</div>
          <div class='the-golden-one'>THE GOLDEN ONE</div>
        </a>
      </div>
    `)
  }

  const handleNavClick = () => {
    $('#nav-btn').click(() => {
      menuIsOpen = !menuIsOpen
      const marginVal = menuIsOpen ? 0 : '-200px'
      $('#nav-btn').toggleClass('open')
      // $('#side-nav').toggle(200)
      $('#side-nav').animate({'margin-right': marginVal}, 200)
    })
    $('#nav-btn').hover(() => {
      $('#nav-btn .line').css('background-color', '#fab92a')
    }, () => {
      $('#nav-btn .line').css('background-color', 'black')
    })
  }

  // const extraNavIconFormatting = () => {
  //   $('.mobile-icon').hover(() => {
  //     $('.lines').attr('style', 'background-color: #fab92a !important')
  //   })
  //   $('.mobile-icon').children('*').hover(() => {
  //     $('.lines').attr('style', 'background-color: #fab92a !important')
  //   })
  //   $('.mobile-icon .lines::before, .mobile-icon .lines::after').hover(() => {
  //     $('.lines').attr('style', 'background-color: #fab92a !important')
  //   })
  // }

  const initHeader = (() => {
    // getTitleFromPath()
    replaceEntireHeader()
    handleNavClick()
    formatLogo()
  })()
})
