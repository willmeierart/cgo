import faker from 'faker'

export const detailInner = event => {
  const { id, type, title, date, time, time_notes, price, price_notes, location_title, address, phone, other_notes } = event
  return `
    <div id='${id}' class='detail-inner'>
      <div class='detail-item'>
        <div class='col-1'>
          <div class='details'>
            <div class='title'>${title ? title : type.replace('_', ' ')}</div>
            <div class='date'>${date /* have logic in here for handling recurring dates */}</div>
            <div class='time'>${time}</div>
            <div class='time-notes'>(${time_notes})</div>
            <span class='price'>${price}&nbsp;</span>
            <span class='price-notes'>(${price_notes})</span>                
          </div>
          <div class='register-btn'>
            <div>REGISTER</div>
          </div>
        </div>
        <div class='col-2'>
          <div class='location-info-spacer'></div>
          <div>
            <div class='address'>${location_title}</div>              
            <div class='address'>${address}</div>
            <div class='phone'>${phone}</div>
          </div>
          <div class='learn-btn'>
            <div>LEARN ABOUT THIS LOCATION</div>
          </div>
        </div>  
        <div class='col-3'>
          <div class='description'>${other_notes + faker.lorem.paragraph()}</div>
        </div>    
      </div>
    </div>
  `
}

export const descriptionTxtBlock = (title, flatTitle) => `
  <div id='${flatTitle}' class='txt-block'>
    <div class='inner-wrapper'>
      <div class='title'>${title}</div>
      <div class='description-wrapper'>
        <div class='description'>${faker.lorem.paragraph()}</div>
      </div>
      <div class='b-wrapper'>
        <div class='expand-btn'>+</div>
      </div>
    </div>
  </div>
`
