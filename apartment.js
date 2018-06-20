class Apartment {
  constructor(id, name, floor) {
    this.id = id;
    this.name = name;
    this.floor = floor;
    this.bedrooms = [];
  }

  newBedroom(id, name, price, lease_start, term, roomType) {
    let bedroom = new Bedroom(id, name, price, lease_start, term, roomType);
    this.bedrooms.push(bedroom);
  }
}
