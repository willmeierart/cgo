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
      if (txtContent === 'Shop' || txtContent === 'Gourasana' || txtContent === 'Kalindi' || txtContent === 'The Lady') $(item).remove()
      if (txtContent === 'Connect') $(item).addClass('top-lvl')
      if (txtContent === 'Spiritual Lineage') $(item).children('a').attr('href', '/explore/spiritual-lineage')
      // if (txtContent === 'Explore' || txtContent === 'Participate') {
      //   $(item).css({ cursor: 'default', pointerEvents: 'none' }).children({ cursor: 'pointer', pointerEvents: 'all' })
      // }
      if (txtContent === 'Participate') $(item).children('a').attr('href', '/participate/meditation')
      if (txtContent === 'Explore') $(item).children('a').attr('href', '/explore/purpose')
    })
    console.log(firstList);
    items.last().append(`
      <li class='menu-item top-marg'>
        <a href='#'>User Agreement</a>
      </li>
      <li class='menu-item'>
        <a href='#'>Privacy Policy</a>
      </li>
    `)
    const TGClone = twoGifts.clone().addClass('top-marg')
    $(firstList).append(TGClone)
    twoGifts.remove()
    items.first().parent().prepend(`
      <li class='menu-item top-lvl'>
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

  const init = (() => {
    shuffleList()
    appendSocialsAndCopyright()
  })()
})
