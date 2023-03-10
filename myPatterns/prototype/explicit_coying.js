class Address {
  constructor(street, city, state) {
    this.street = street;
    this.city = city;
    this.state = state;
  }

  toString() {
    return `${this.street}, ${this.city}, ${this.state}`;
  }
}

class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  toString() {
    return `${this.name} lives at ${this.address.toString()}`;
  }
}

const prototype = new Person('Nico', new Address('123 Main St.', 'New York', 'NY'));
const person2 = JSON.parse(JSON.stringify(prototype));
const person3 = JSON.parse(JSON.stringify(prototype));
person2.toString = function() {
  return `${this.name} lives at ${this.address.toString()}`;
}
person2.address.toString = function() {
  return `${this.street}, ${this.city}, ${this.state}`;
}
person3.toString = function() {
  return `${this.name} lives at ${this.address.toString()}`;
}
person3.address.toString = function() {
  return `${this.street}, ${this.city}, ${this.state}`;
}

console.log('person1:', prototype.toString())
console.log('person2:', person2.toString())
console.log('person3:', person3.toString())


console.log("----------------------------------------------------")

person2.name = "Andy" 
person2.address.city = "Amsterdam" 

person3.name = "Luigy" 
person3.address.city = "Miami" 

console.log('person1:', prototype.toString())
console.log('person2:', person2.toString())
console.log('person3:', person3.toString())

