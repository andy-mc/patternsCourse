class Address {
  constructor(street, city, state) {
    this.street = street;
    this.city = city;
    this.state = state;
  }

  deepCopy() {
    return new Address(this.street, this.city, this.state);
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

  deepCopy() {
    return new Person(this.name, this.address.deepCopy());
  }

  toString() {
    return `${this.name} lives at ${this.address.toString()}`;
  }
}

const prototype = new Person('Nico', new Address('123 Main St.', 'New York', 'NY'));
const person2 = prototype.deepCopy();
const person3 = prototype.deepCopy();

console.log('person2:', person2.toString())
console.log('person3:', person3.toString())

console.log("----------------------------------------------------")

person2.name = "Andy" 
person2.address.street = "main st Amsterdam" 
person2.address.city = "Amsterdam" 

person3.name = "Luigy" 
person3.address.street = "Coral Gabels st" 
person3.address.city = "Miami" 

console.log('person2:', person2.toString())
console.log('person3:', person3.toString())

