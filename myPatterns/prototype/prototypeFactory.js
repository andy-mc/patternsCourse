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
      return object !== null && t.name === object.constructor.name
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

class EmployeeFactory {
  static _newEmployee(prototype, name, street) {
    const newPrototype = EmployeeFactory.serializer.deepCopy(prototype);
    newPrototype.name = name;
    newPrototype.address.street = street;
    return newPrototype;
  }

  static newNyStaff(name, street) {
    return EmployeeFactory._newEmployee(EmployeeFactory.nyStaff, name, street);
  }

  static newUioStaff(name, street) {
    return EmployeeFactory._newEmployee(EmployeeFactory.uioStaff, name, street);
  }
}
EmployeeFactory.serializer = new Serializer([Person, Address]);
EmployeeFactory.nyStaff = new Person(null, new Address(null, 'New York', 'NY'));
EmployeeFactory.uioStaff = new Person(null, new Address(null, 'Quito', 'Ecuador'));

const person1 = EmployeeFactory.newNyStaff("Luigy", 1111)
const person2 = EmployeeFactory.newUioStaff("Andy", 2222)

console.log('person1:', person1.toString())
console.log('person2:', person2.toString())
person2.greet()
