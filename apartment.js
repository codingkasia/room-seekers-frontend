class Apartment {
    constructor(name, floor) {
        this.name = name
        this.floor = floor
        this.bedrooms = []
    }

    newBedroom(name, price, lease_start, term) {
        bedroom = new Bedroom(name, price, lease_start, term)
        this.bedrooms.push(bedroom)
    }

}