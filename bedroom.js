class Bedroom {
  constructor(id, name, price, lease_start, term, roomType) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.lease_start = lease_start;
    this.term = term;
    this.roomType = roomType
    aptStore.bedrooms.push(this)
  }
}