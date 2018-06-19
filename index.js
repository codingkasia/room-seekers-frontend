const apartmentsURL = "http://localhost:3000/api/v1/apartments";

const apartmentStore = [];

const getApartmentsData = () => {
  return fetch(apartmentsURL).then(res => res.json());
};

const buildApartments = () => {
  getApartmentsData()
    .then(res => {
      res.data.forEach(apt => {
        apartmentStore[`apt${apt.id}`] = new Apartment(
          apt.id,
          apt.attributes.name,
          apt.attributes.floor
        );
      });
      return res;
    })
    .then(res =>
      res.included.forEach(br => {
        apartmentStore[`apt${br.attributes["apartment-id"]}`].newBedroom(
          // id, name, price, lease_start, term
          br.id,
          br.attributes.name,
          br.attributes.price,
          br.attributes["lease-start"],
          br.attributes.term
        );
      })
    );
};

const buildBedrooms = res => {
  apartmentStore.forEach(apt => {});
};

document.addEventListener("DOMContentLoaded", () => {
  const apartmentsURL = "http://localhost:3000/api/v1/apartments";
});
