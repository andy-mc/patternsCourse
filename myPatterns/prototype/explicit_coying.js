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

  greet() {
    console.log(`Hello, my name is ${this.name} I live at ${this.address.toString()}`)
  }
}

class Serializer {
  constructor(types) {
    this.types = types;
  }

  markRecursive(object) {
    let idx = this.types.findIndex(t =>{ 
      return t.name === object.constructor.name
    });

    if (idx !== -1) {
      object["typeIndex"] = idx;

      for (let prop in object) {
        if (object.hasOwnProperty(prop)) {
          this.markRecursive(object[prop]);
        }
      }

      return object;
    }

    return object;
  }

  reconstructRecursive(object) {
    if (object.hasOwnProperty('typeIndex')) {
      const type = this.types[object.typeIndex]
      const newInstance  = new type();
           
      for (let prop in object) {
        if (object.hasOwnProperty(prop) && prop !== 'typeIndex' && object[prop] !== null) {
          newInstance[prop] = this.reconstructRecursive(object[prop]);
        }
      }
      
      return newInstance;
    }
    
    return object;
  }

  deepCopy(object) {
    let marked = this.markRecursive(object);
    let copy = JSON.parse(JSON.stringify(marked));
    return this.reconstructRecursive(copy);
  }
}

const prototype = new Person('Nico', new Address('123 Main St.', 'New York', 'NY'));
const serializer = new Serializer([Person, Address]);
const person2 = serializer.deepCopy(prototype);
const person3 = serializer.deepCopy(prototype);

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
person3.greet()
