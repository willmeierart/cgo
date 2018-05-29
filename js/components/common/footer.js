import fb from '../../../assets/facebookIcon'
import ig from '../../../assets/instagramIcon'
import tw from '../../../assets/twitterIcon'

jQuery(document).ready(function($) { 
  // const isThin = $(window).width() <= 1000
  // const clonedMenu = isThin ? $({
  //       ...$('.mobile-only .menu').clone()
  //     }) : $({ ...$('nav .sf-menu').clone() })

  $('#footer-outer h4').remove()

  // $('a').filter((x, b) => {
  //   return $(b).attr('href') === '/learn/spiritual-masters'
  // }).each((i, a) => {
  //     console.log(a);
  //     if (i !== 0) {
  //       // $(a).replaceWith($('a').children())
  //       console.log($(a).children());
  //     }
  //   })

  // $('#text-3 p').each((i, social) => {
  //   let className = ''
  //   const txtContent = $(social).text()
  //   switch (true) {
  //     case (txtContent.indexOf('facebook') !== -1) :
  //       className = 'facebook'
  //       break
  //     case (txtContent.indexOf('linkedin') !== -1) :
  //       className = 'linkedin'
  //       break
  //     default:
  //       break
  //   }
  //   $(social).replaceWith(`<a href='${txtContent}' target='_blank'><i class="fas fa-${className}"></i></a>`)

  // })

  const shuffleList = () => {
    const items = $('#footer-outer').find('li.menu-item')
    console.log(items)
    let twoGifts
    let firstList
    items.each((i, item) => {
      const txtContent = $(item).children('a').text()
      if (txtContent === 'Two Gifts') twoGifts = $(item)
      if (i === 0) firstList = item
      if (i < 3) {
        $(item).addClass('mobile-col-1')
      } else {
        $(item).addClass('mobile-col-2')
      }
      if (txtContent === 'Shop' || txtContent === 'Gourasana' || txtContent === 'Kalindi' || txtContent === 'The Lady') $(item).remove()
      if (txtContent === 'Connect') $(item).addClass('top-lvl')
      if (txtContent === 'Spiritual Lineage') $(item).addClass('mobile-exp').children('a')
        .attr('href', '/explore/spiritual-lineage')
        // .attr('href', window.innerWidth >= 1000 ? '/explore/spiritual-lineage' : '')
      // if (txtContent === 'Explore' || txtContent === 'Participate') {
      //   $(item).css({ cursor: 'default', pointerEvents: 'none' }).children({ cursor: 'pointer', pointerEvents: 'all' })
      // }
      if (txtContent === 'Participate') $(item).addClass('mobile-exp').children('a')
        .attr('href', '/participate/meditation')
        // .attr('href', window.innerWidth >= 1000 ? '/participate/meditation' : '')
      if (txtContent === 'Explore') $(item).addClass('mobile-exp').children('a')
        .attr('href', '/explore/purpose')
        // .attr('href', window.innerWidth >= 1000 ? '/explore/purpose' : '')
    })

    // $('#footer-outer').find('.container').append(`
    //   <li class='menu-item top-marg'>
    //     <a href='#'>User Agreement</a>
    //   </li>
    //   <li class='menu-item'>
    //     <a href='#'>Privacy Policy</a>
    //   </li>
    // `)

    const TGClone = twoGifts.clone().addClass('top-marg menu-item two-gifts-thin')
    $(firstList).append(TGClone)
    twoGifts.remove()
    items.first().parent().prepend(`
      <li class='menu-item top-lvl mobile-col-1'>
        <a href='/'>Home</a>
      </li>
    `)
    $('#footer-outer').find('.top-marg').css({ marginTop: '2em' })
  }

  const appendSocialsAndCopyright = () => {
    const footer = $('#footer-widgets').find('.row')
    footer.append(`
      <div class='bottom-section'>
        <div class='socials-container'>
          <div class='facebook'></div>
          <div class='twitter'></div>
          <div class='instagram'></div>
        </div>
        <div class='copyright'>© Center of the Golden One, 2018</div>
        <ul class='ua-pp'>
          <li class='menu-item'>
            <a href='#'>User Agreement </a>
            <span class='gold-text'>/</span>
          </li>
          <li class='menu-item'>
            <a href='#'>Privacy Policy</a>
          </li>
        </ul>
      </div>
    `)
    $('.bottom-section').children('.socials-container').children('div').each((i, icon) => {
      if ($(icon).hasClass('facebook')) {
        $(icon).append(`
          <a>${fb}</a>
        `)
      } else if ($(icon).hasClass('twitter')) {
        $(icon).append(`
          <a>${ig}</a>
        `)
      } else if ($(icon).hasClass('instagram')) {
        $(icon).append(`
          <a>${tw}</a>
        `)
      }
    })
  }

  const handleMobile = () => {
    $('#menu-main-1').append(`
      <li class='mobile-wrapper-1'><ul></ul></li>
      <li class='mobile-wrapper-2'><ul></ul></li>
    `).css({ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' })
    $('.menu-item').each((i, item) => {
      if ($(item).parent('.sub-menu').length !== 0) {
        $(item).remove()
      }
    })
    const clone1 = $('.mobile-col-1').addClass('orig').clone()
    const clone2 = $('.mobile-col-2').addClass('orig').clone()
    clone1.addClass('cloned').removeClass('orig')
    clone2.addClass('cloned').removeClass('orig')
    $('.mobile-wrapper-1 ul').css({ display: 'flex', flexDirection: 'column' }).append(clone1)
    $('.mobile-wrapper-2 ul').css({ display: 'flex', flexDirection: 'column' }).append(clone2)
    $('.mobile-col-1.orig').remove()
    $('.mobile-col-2.orig').remove()
    $('#footer-outer').find('.sub-menu, .tert-menu').addClass('hidden')
    $('#footer-outer').find('.menu-item').removeClass('top-marg')
    $('#footer-outer').find('.two-gifts-thin').addClass('top-lvl')
    // $('.hidden').css({ display: 'none' })
    console.log('mobile exp:::', $('.mobile-exp'))
    $('.mobile-exp').click(e => {
      // e.stopPropagation()
      e.preventDefault()
      const el = $(e.target).hasClass('menu-item') ? $(e.target) : $(e.target).closest('.menu-item')
      console.log('clicked', el.children('.hidden'))
      // el.children('.hidden').first().slideToggle(200)
      // el.find('.hidden').first().slideToggle(200)
    })
    $('.two-gifts-thin').last().remove()
    // $('.mobile-exp').children('.sub-menu')
  }

  const init = (() => {
    console.log($('#footer-outer').find('.sub-menu'))
    shuffleList()
    appendSocialsAndCopyright()
    if (window.innerWidth < 1000) {
      handleMobile()
    }
  })()
})
