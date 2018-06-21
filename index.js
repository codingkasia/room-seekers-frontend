// Fetch & Build Apartment Data

const aptStore = {
  apartments: [],
  bedrooms: [],
  filters: {
    price: 3000,
    startDate: new Date()
  },
  currentApt: 1,
  roomTypes: {
    a: "https://i.imgur.com/BNk5Tva.png",
    b: "https://i.imgur.com/BNk5Tva.png",
    c: "https://i.imgur.com/BNk5Tva.png",
    d: "https://i.imgur.com/BNk5Tva.png",
    e: "https://i.imgur.com/BNk5Tva.png"
  }
};

const apartmentsURL = "http://localhost:3000/api/v1/apartments";

const getApartmentsData = () => {
  return fetch(apartmentsURL).then(res => res.json());
};

const fetchApartments = () => {
  return getApartmentsData()
    .then(buildApartments)
    .then(buildBedrooms);
};

const buildApartments = res => {
  res.data.forEach(apt => {
    aptStore.apartments[`apt${apt.id}`] = new Apartment(
      apt.id,
      apt.attributes.floor
    );
  });
  return res;
};

const buildBedrooms = res => {
  res.included.forEach(br => {
    aptStore.apartments[`apt${br.attributes["apartment-id"]}`].newBedroom(
      // id, name, price, lease_start, term, roomType
      br.id,
      br.attributes.name,
      br.attributes.price,
      br.attributes["lease-start"],
      br.attributes.term,
      br.attributes["room-type"]
    );
  });
  return res;
};

// Selectors

const aptContainer = () => {
  return document.querySelector(".grid-container");
};

const brBoxSelector = num => {
  return document.querySelector(`rect.br${num}`);
};

const brTextSelector = num => {
  return document.querySelector(`text.br${num}`);
};

const aptBoxSelector = num => {
  return document.querySelector(`.apt${num}`);
};

const priceSelectValue = () => {
  return document.querySelector(".price").value;
};

const monthSelectValue = () => {
  return parseInt(document.querySelector(".moveDate").value);
};

const filterButton = () => {
  return document.querySelector("input");
};

const aptDivSelector = () => {
  return document.querySelector(".apartment-buttons");
};

const svgSelector = () => {
  return document.querySelector(".svg-play");
};

const brDetailView = () => {
  return document.querySelector(".br-show-container");
};

// Listeners

const filterButtonListener = () => {
  filterButton().addEventListener("click", e => {
    e.preventDefault();
    const price = priceSelectValue();
    const months = monthSelectValue();
    aptStore.filters.price = price;
    let date = new Date();
    aptStore.filters.startDate = dateConverter(date, months);
    displayBedrooms(aptStore.currentApt);
  });
};

const dateConverter = (date, months) => {
  return date.setMonth(date.getMonth() + months);
};

const aptSelectListener = () => {
  aptDivSelector().addEventListener("click", e => {
    const apartment = parseInt(e.target.innerText);
    displayBedrooms(apartment);
    aptStore.currentApt = apartment;
  });
};

// App

const displayBedrooms = num => {
  let counter = 1;
  fetchApartments()
    .then(res => {
      aptStore.apartments[`apt${num}`].bedrooms.forEach(bedroom => {
        brBoxSelector(counter).setAttribute("data-id", bedroom.id);
        const textY = brTextSelector(counter).getAttribute("y");
        const textX = brTextSelector(counter).getAttribute("x");
        const fontSize = brTextSelector(counter).getAttribute("font-size");

        brTextSelector(counter).innerHTML = `
          <tspan x="${textX}" y="${textY}"> ${bedroom.name} </tspan>
          <tspan x="${textX}" y="${parseInt(textY) + 75}"> $${
          bedroom.price
        }/mo. </tspan>
          <tspan x="${textX}" y="${parseInt(textY) + 150}"> ${getLeaseEndDate(
          bedroom
        )} </tspan> `;
        bedroomFilter(bedroom)
          ? (brBoxSelector(counter).style.fill = "18BC9B")
          : (brBoxSelector(counter).style.fill = "white");

        counter++;
        return res;
      });
    })
    .then(makeGreenApartments);
};

const getLeaseEndDate = bedroom => {
  let date = new Date(bedroom.lease_start);

  date = date.setMonth(date.getMonth() + bedroom.term);
  // let day = date.getDay();
  // let month = date.getMonth();
  // let year = date.getFullYear()
  // return `${year}-${month}-${day}`
  var d = new Date(date);
  return d.toLocaleDateString();
};

const bedroomFilter = bedroom => {
  date = new Date(bedroom.lease_start);
  return (
    bedroom.price < aptStore.filters.price &&
    dateConverter(date, bedroom.term) < aptStore.filters.startDate
  );
};

const apartmentFilter = apartment => {
  let filtered = false;
  apartment.bedrooms.forEach(bedroom => {
    if (bedroomFilter(bedroom)) {
      filtered = true;
    }
  });
  return filtered;
};

const makeGreenApartments = () => {
  for (let i = 1; i < 5; i++) {
    if (apartmentFilter(aptStore.apartments[`apt${i}`])) {
      aptBoxSelector(i).setAttribute("class", `btn btn-success apt${i}`);
    } else {
      aptBoxSelector(i).setAttribute(
        "class",
        `btn btn-secondary disabled apt${i}`
      );
    }
  }
};
//   // aptStore.apartments.forEach(apartment => {
//   //   console.log(apartment);
//   //   if (apartmentFilter(apartment)) {
//   //     aptBoxSelector(counter).style.backgroundColor = "green";
//   //   } else {
//   //     aptBoxSelector(counter).style.backgroundColor = "white";
//   //   }
//   //   counter++;
//   // });
// };

// show a detail view

function brDetailViewListener() {
  for (let i = 1; i < 6; i++) {
    brBoxSelector(i).addEventListener("click", event => {
      displayDetailBrView(brBoxSelector(i).dataset.id);
    });
    brTextSelector(i).addEventListener("click", event => {
      displayDetailBrView(brBoxSelector(i).dataset.id);
    });
  }
}

function getBrImgUrl(bedroomId) {
  let bedroomArr = aptStore.bedrooms.filter(bedroom => bedroom.id == bedroomId);
  let roomType = bedroomArr[0].roomType;
  return svgStore[`${roomType}`];
}

function getBrName(bedroomId) {
  let bedroomArr = aptStore.bedrooms.filter(bedroom => bedroom.id == bedroomId);
  return bedroomArr[0].name;
}

function displayDetailBrView(bedroomId) {
  const imgUrl = getBrImgUrl(bedroomId);
  const brName = getBrName(bedroomId);
  brDetailView().innerHTML = `
  <svg viewBox="0 0 500 1000">
  ${imgUrl}
  <text x="5" y="290" font-family="Verdana" font-size="25" fill="black">${brName}</text>
  </svg>`;
}

// Initialize

document.addEventListener("DOMContentLoaded", () => {
  displayBedrooms(aptStore.currentApt);
  filterButtonListener();
  aptSelectListener();
  brDetailViewListener();
});
