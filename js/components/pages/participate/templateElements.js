export const detailInner = event => {
  const { id, title, time, price, price_notes, location, description, day, start, end, time_notes } = event
  return `
    <div id='${id}' class='detail-inner'>
      <div class='title'>${title}</div>
      <div class='detail-item'>
        <div class='col-1'>
          <div class='details'>
            <div class='date'>${day ? day : end.time !== null ? start.date + ' - ' + end.date : start.date}
            </div>
            <div class='time'>${day ? start : end.time !== null ? start.time + ' - ' + end.time : start.time}
            </div>
            <div class='time-notes'>${time_notes ? '(' + time_notes + ')' : ''}</div>
            <div class='price'>${price}</div>
            <div class='price-notes'>${price_notes ? '(' + price_notes + ')' : ''}</div>                
          </div>
          <div class='register-btn'>
            <div>REGISTER</div>
          </div>
        </div>
        <div class='col-2'>
          <div class='location-info-spacer'></div>
          <div>
            <div class='address'>${location.title}</div>              
            <div class='address'>${location.address}</div>
            <div class='phone'>${location.phone}</div>
          </div>
        </div>  
        <div class='col-3'>
          <div class='description'>${description}</div>
        </div>    
      </div>
    </div>
  `
}

export const descriptionTxtBlock = course => `
  <div id='${course.Id}' class='txt-block'>
    <div class='inner-wrapper'>
      <div class='title'>${course.Name}</div>
      <div class='description-wrapper'>
        <div class='description'>${course.Descripton}</div>
      </div>
      <div class='b-wrapper'>
        <div class='expand-btn'>+</div>
      </div>
    </div>
  </div>
`

export const mobileFilterModule = filterObj => (`
  <div class='mobile-filter-module ${filterObj.isOpen ? 'open' : 'closed'} ${filterObj.class} ${filterObj.isVisible ? 'visible' : 'hidden'}'>
    <div data-title='${filterObj.class}' class='title-block'>${filterObj.isOpen ? filterObj.title : filterObj.activeProp}</div>
    ${filterObj.list}
  </div>
`)
