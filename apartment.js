class Apartment {
  constructor(id, floor) {
    this.id = id;
    this.floor = floor;
    this.bedrooms = [];
  }

  newBedroom(id, name, price, lease_start, term, roomType) {
    let bedroom = new Bedroom(id, name, price, lease_start, term, roomType);
    this.bedrooms.push(bedroom);
  }
}
