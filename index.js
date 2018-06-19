// Fetch & Build Apartment Data

const aptStore = {
  apartments: [],
  filters: {
    price: 5000,
    startDate: 0
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

const aptBoxSelector = num => {
  return document.querySelector(`.apt-${num}`);
};

const priceSelectValue = () => {
  return document.querySelector("select").value;
};

const filterButton = () => {
  return document.querySelector("input");
};

// Listeners

const filterButtonListener = () => {
  filterButton().addEventListener("click", e => {
    e.preventDefault();
    price = priceSelectValue();
    aptStore.filters.price = price;
    displayApartments(1);
  });
};

// App

const displayApartments = num => {
  let counter = 1;
  fetchApartments().then(res => {
    aptStore.apartments[`apt${num}`].bedrooms.forEach(bedroom => {
      aptBoxSelector(counter).innerHTML = `<ul>
      <li>${bedroom.name}</li>
      <li>${bedroom.price}</li>
      </ul>`;
      bedroomFilter(bedroom.price)
        ? (aptBoxSelector(counter).style.background = "green")
        : (aptBoxSelector(counter).style.background = "white");
      // if (bedroom.price < 2000) {
      //   aptBoxSelector(counter).style.background = "green";
      // }
      counter++;
    });
  });
};

const bedroomFilter = price => {
  return price < aptStore.filters.price;
};

// const filterByPrice = price => {
//   const fitBedrooms = aptStore.apartments.apt1.bedrooms.filter(
//     bedroom => bedroom.price < 2000
//   );
//   console.log(fitBedrooms);
// };

// Initialize

document.addEventListener("DOMContentLoaded", () => {
  const apartmentsURL = "http://localhost:3000/api/v1/apartments";
  displayApartments(1);
  filterButtonListener();
});
