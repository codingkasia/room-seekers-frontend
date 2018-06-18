const getApartmentsData = () => {
  return fetch(apartmentsURL).then(res => res.json());
};

document.addEventListener("DOMContentLoaded", () => {
  const apartmentsURL = "http://localhost:3000/api/v1/apartments";
});
