// Fetch & Build Apartment Data

const aptStore = [];

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
    aptStore[`apt${apt.id}`] = new Apartment(
      apt.id,
      apt.attributes.name,
      apt.attributes.floor
    );
  });
  return res;
};

const buildBedrooms = res => {
  res.included.forEach(br => {
    aptStore[`apt${br.attributes["apartment-id"]}`].newBedroom(
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

// App

const displayApartments = num => {
  let counter = 1;
  aptStore[`apt${num}`].bedrooms.forEach(bedroom => {
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
};

let priceStore = 5000;

const bedroomFilter = price => {
  return price < priceStore;
};

// const filterByPrice = price => {
//   const fitBedrooms = aptStore.apt1.bedrooms.filter(
//     bedroom => bedroom.price < 2000
//   );
//   console.log(fitBedrooms);
// };

// Initialize

document.addEventListener("DOMContentLoaded", () => {
  const apartmentsURL = "http://localhost:3000/api/v1/apartments";
  fetchApartments().then(res => {
    displayApartments(1);
  });
});
