import fb from '../../../assets/facebookIcon'
import ig from '../../../assets/instagramIcon'
import tw from '../../../assets/twitterIcon'

jQuery(document).ready(function($) { 
  $('#footer-outer h4').remove()

  const shuffleList = () => {
    const items = $('#footer-outer').find('li.menu-item')
    let twoGifts
    let firstList
    items.each((i, item) => {
      const txtContent = $(item).children('a').text()
      if (txtContent === 'Two Gifts') $(item).addClass('top-lvl')
      if (i === 0) firstList = item
      if (i < 3) {
        $(item).addClass('mobile-col-1')
      } else {
        $(item).addClass('mobile-col-2')
      }
      if (txtContent === 'Store' || txtContent === 'Shop' || txtContent === 'Gourasana' || txtContent === 'Kalindi' || txtContent === 'The Lady') $(item).remove()
      if (txtContent === 'Connect') $(item).addClass('top-lvl')
      if (txtContent === 'Spiritual Lineage') $(item).addClass('mobile-exp').children('a')
        .attr('href', '/explore/spiritual-lineage')
      if (txtContent === 'Participate') $(item).addClass('mobile-exp').children('a')
        .attr('href', '/participate/meditation')
      if (txtContent === 'Explore') $(item).addClass('mobile-exp').children('a')
        .attr('href', '/explore/purpose')
    })
    // const TGClone = twoGifts.clone().addClass('top-marg menu-item two-gifts-thin')
    // $(firstList).append(TGClone)
    // twoGifts.remove()
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
        <div class='copyright'>
          <div>© Center of the Golden One, 2018.</div>
          <div> All rights reserved.</div>
        </div>
        <ul class='ua-pp'>
          <li class='menu-item'>
            <a href='/user-agreement'>User Agreement </a>
            <span class='gold-text'>/</span>
            <a href='/user-agreement'>Privacy Policy</a>
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
    $('#footer-outer #menu-main-1').append(`
      <li class='mobile-wrapper-1'><ul></ul></li>
      <li class='mobile-wrapper-2'><ul></ul></li>
    `).css({ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' })
    $('#footer-outer .menu-item').each((i, item) => {
      if ($(item).parent('.sub-menu').length !== 0) {
        $(item).remove()
      }
    })
    const clone1 = $('#footer-outer .mobile-col-1').addClass('orig').clone()
    const clone2 = $('#footer-outer .mobile-col-2').addClass('orig').clone()
    clone1.addClass('cloned').removeClass('orig')
    clone2.addClass('cloned').removeClass('orig')
    $('#footer-outer .mobile-wrapper-1 ul').css({ display: 'flex', flexDirection: 'column' }).append(clone1)
    $('#footer-outer .mobile-wrapper-2 ul').css({ display: 'flex', flexDirection: 'column' }).append(clone2)
    $('#footer-outer .mobile-col-1.orig').remove()
    $('#footer-outer .mobile-col-2.orig').remove()
    $('#footer-outer').find('.sub-menu, .tert-menu').addClass('hidden')
    $('#footer-outer').find('.menu-item').removeClass('top-marg')
    $('#footer-outer').find('.two-gifts-thin').addClass('top-lvl')
    $('.mobile-exp').click(e => {
      e.preventDefault()
      const el = $(e.target).hasClass('menu-item') ? $(e.target) : $(e.target).closest('.menu-item')
    })
    $('.two-gifts-thin').last().remove()
  }

  const init = (() => {
    shuffleList()
    appendSocialsAndCopyright()
    if (window.innerWidth < 1000) {
      handleMobile()
    }
  })()
})
