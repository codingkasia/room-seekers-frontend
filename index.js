// store
// export NODE_ENV = development;
const aptStore = {
  apartments: [],
  bedrooms: [],
  filters: {
    price: 3000,
    startDate: new Date()
  },
  currentApt: 1
}

// Fetch & Build Apartment Data
const apartmentsURL =
  process.env["NODE_ENV"] === "development"
    ? "http://localhost:3000/api/v1/apartments"
    : "https://room-seekers.herokuapp.com//api/v1/apartments";
// const apartmentsURL = "http://localhost:3000/api/v1/apartments";

const getApartmentsData = () => {
  return fetch(apartmentsURL).then(res => res.json())
};

const fetchApartments = () => {
  return getApartmentsData()
    .then(buildApartments)
    .then(buildBedrooms)
};

const buildApartments = res => {
  res.data.forEach(apt => {
    aptStore.apartments[`apt${apt.id}`] = new Apartment(
      apt.id,
      apt.attributes.floor
    )
  })
  return res
};

const buildBedrooms = res => {
  res.included.forEach(br => {
    aptStore.apartments[`apt${br.attributes['apartment-id']}`].newBedroom(
      // id, name, price, lease_start, term, roomType
      br.id,
      br.attributes.name,
      br.attributes.price,
      br.attributes['lease-start'],
      br.attributes.term,
      br.attributes['room-type']
    )
  })
  return res
};

// Selectors
const aptContainer = () => {
  return document.querySelector('.grid-container')
};

const brBoxSelector = num => {
  return document.querySelector(`.rect-br${num}`)
};

const brTextSelector = num => {
  return document.querySelector(`text.br${num}`)
};

const aptBoxSelector = num => {
  return document.querySelector(`.apt${num}`)
};

const priceSelectValue = () => {
  return document.querySelector('.price').value
};

const monthSelectValue = () => {
  return parseInt(document.querySelector('.moveDate').value)
};

const filterButton = () => {
  return document.querySelector('input')
};

const priceFilter = () => {
  return document.querySelector('.price')
};

const moveDateFilter = () => {
  return document.querySelector('.moveDate')
};

const aptDivSelector = () => {
  return document.querySelector('.apartment-buttons')
};

const svgSelector = () => {
  return document.querySelector('.svg-play')
};

const brDetailView = () => {
  return document.querySelector('.br-show')
};

// Listeners

// const filterButtonListener = () => {
//   filterButton().addEventListener("click", e => {
//     e.preventDefault();
//     filterApartments();
//   });
// };

const priceSelectListener = () => {
  priceFilter().addEventListener('change', () => {
    console.log('price listener')
    filterApartments()
  })
};

const moveDateSelectListener = () => {
  moveDateFilter().addEventListener('change', () => {
    console.log('move date listener')
    filterApartments()
  })
};

const aptSelectListener = () => {
  aptDivSelector().addEventListener('click', e => {
    const apartment = parseInt(e.target.innerText)
    displayBedrooms(apartment)
    aptStore.currentApt = apartment
  })
};

// App

const filterApartments = () => {
  const price = priceSelectValue()
  const months = monthSelectValue()
  aptStore.filters.price = price
  let date = new Date()
  aptStore.filters.startDate = dateConverter(date, months)
  displayBedrooms(aptStore.currentApt)
};

const displayBedrooms = num => {
  let counter = 1
  fetchApartments()
    .then(res => {
      aptStore.apartments[`apt${num}`].bedrooms.forEach(bedroom => {
        brBoxSelector(counter).setAttribute('data-id', bedroom.id)
        const textY = brTextSelector(counter).getAttribute('y')
        const textX = brTextSelector(counter).getAttribute('x')
        const fontSize = brTextSelector(counter).getAttribute('font-size')

        brTextSelector(counter).innerHTML = `
          <tspan x="${textX}" y="${textY}">${bedroom.name} </tspan>
          <tspan x="${textX}" y="${parseInt(textY) + 40}"> $${
  bedroom.price
}/mo. </tspan>
        <tspan x="${textX}" y="${parseInt(textY) + 80}">Available:</tspan>
          <tspan x="${textX}" y="${parseInt(textY) + 120}"> ${getLeaseEndDate(
  bedroom
)} </tspan> `
        bedroomFilter(bedroom)
          ? (brBoxSelector(counter).style.fill = '18BC9B')
          : (brBoxSelector(counter).style.fill = 'white')

        counter++
        return res
      })
    })
    .then(makeGreenApartments)
};

const getLeaseEndDate = bedroom => {
  let date = new Date(bedroom.lease_start)
  date = date.setMonth(date.getMonth() + bedroom.term)
  let d = new Date(date)
  d.setDate(d.getDate() + 1)
  return d.toLocaleDateString()
};

const dateConverter = (date, months) => {
  return date.setMonth(date.getMonth() + months)
};

const bedroomFilter = bedroom => {
  date = new Date(bedroom.lease_start)
  return (
    bedroom.price <= aptStore.filters.price &&
    dateConverter(date, bedroom.term) < aptStore.filters.startDate
  )
};

const apartmentFilter = apartment => {
  let filtered = false
  apartment.bedrooms.forEach(bedroom => {
    if (bedroomFilter(bedroom)) {
      filtered = true
    }
  })
  return filtered
};

const makeGreenApartments = () => {
  for (let i = 1; i < 5; i++) {
    if (apartmentFilter(aptStore.apartments[`apt${i}`])) {
      aptBoxSelector(i).setAttribute('class', `btn btn-success apt${i}`)
    } else {
      aptBoxSelector(i).setAttribute(
        'class',
        `btn btn-secondary disabled apt${i}`
      )
    }
  }
}

// show a detail view

const brDetailViewListener = () => {
  for (let i = 1; i < 6; i++) {
    brBoxSelector(i).addEventListener('click', event => {
      displayDetailBrView(brBoxSelector(i).dataset.id)
    })
    brTextSelector(i).addEventListener('click', event => {
      displayDetailBrView(brBoxSelector(i).dataset.id)
    })
  }
}

const getBrImgUrl = bedroomId => {
  let bedroomArr = aptStore.bedrooms.filter(bedroom => bedroom.id == bedroomId)
  let roomType = bedroomArr[0].roomType
  return svgStore[`${roomType}`]
};

const getBrName = bedroomId => {
  let bedroomArr = aptStore.bedrooms.filter(bedroom => bedroom.id == bedroomId)
  return bedroomArr[0].name
};

const displayDetailBrView = bedroomId => {
  const imgUrl = getBrImgUrl(bedroomId)
  const brName = getBrName(bedroomId)
  brDetailView().innerHTML = `
  <svg viewBox="0 0 300 600">
  ${imgUrl}
  <text x="5" y="290" font-family="Verdana" font-size="25" fill="black">${brName}</text>
  </svg>`
};

// Initialize

const addListeners = () => {
  // filterButtonListener();
  aptSelectListener()
  brDetailViewListener()
  priceSelectListener()
  moveDateSelectListener()
};

document.addEventListener('DOMContentLoaded', () => {
  displayBedrooms(aptStore.currentApt)
  addListeners()
})
