// Fetch & Build Apartment Data

const aptStore = {
  apartments: [],
  filters: {
    price: 3000,
    startDate: new Date()
  },
  currentApt: 1
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
      apt.attributes.name,
      apt.attributes.floor
    );
  });
  return res;
};

const buildBedrooms = res => {
  res.included.forEach(br => {
    aptStore.apartments[`apt${br.attributes["apartment-id"]}`].newBedroom(
      // id, name, price, lease_start, term
      br.id,
      br.attributes.name,
      br.attributes.price,
      br.attributes["lease-start"],
      br.attributes.term
    );
  });
  return res;
};

// Selectors

const aptContainer = () => {
  return document.querySelector(".grid-container");
};

const brBoxSelector = num => {
  return document.querySelector(`.br${num}`);
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
        brBoxSelector(counter).innerHTML = `<ul>
      <li>${bedroom.name}</li>
      <li>${bedroom.price}</li>
      </ul>`;
        bedroomFilter(bedroom)
          ? (brBoxSelector(counter).style.fill = "green")
          : (brBoxSelector(counter).style.fill = "white");
        counter++;
        return res;
      });
    })
    .then(makeGreenApartments);
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
      aptBoxSelector(i).style.backgroundColor = "green";
    } else {
      aptBoxSelector(i).style.backgroundColor = "white";
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

// Initialize

document.addEventListener("DOMContentLoaded", () => {
  const apartmentsURL = "http://localhost:3000/api/v1/apartments";
  displayBedrooms(aptStore.currentApt);
  filterButtonListener();
  aptSelectListener();
});
