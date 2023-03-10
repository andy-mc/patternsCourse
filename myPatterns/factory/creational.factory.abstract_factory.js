const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Drink {
  consume() {}
}

class Tea extends Drink {
  consume() {
    console.log('This tea is nice with lemon!');
  }
}

class Coffee extends Drink {
  consume() {
    console.log(`This coffee is delicious!`);
  }
}

class Match extends Drink {
  consume() {
    console.log(`This matcha is delicious!`);
  }
}

class DrinkFactory {
  prepare(amount) { /* abstract */ }
}

class TeaFactory extends DrinkFactory {
  prepare(amount) {
    console.log(`Grind some beans, boil water, pour ${amount} ml`);
    return new Tea();
  }
}

class CoffeeFactory extends DrinkFactory {
  prepare(amount) {
    console.log(`Put in tea bag, boil water, pour ${amount}ml`);
    return new Coffee();
  }
}

class MatchaFactory extends DrinkFactory {
  prepare(amount) {
    console.log(`A lot of awesome ceremony for matcha an water ${amount} ml`);
    return new Matcha();
  }
}

class HotDrinkMachine {
  constructor(availableDrink) {
    this.factories = {};
    for (let drink in availableDrink) {
      this.factories[drink] = new availableDrink[drink]();
    }
  }

  interact(consumer) {
    rl.question('Please specify drink and amount ' +
      '(e.g., tea 50): ', answer => {
      let parts = answer.split(' ');
      let name = parts[0];
      let amount = parseInt(parts[1]);
      let d = this.factories[name].prepare(amount);
      rl.close();
      consumer(d);
    });
  }
}

let availableDrink = Object.freeze({
  coffee: CoffeeFactory,
  tea: TeaFactory,
  matcha: MatchaFactory
});

let machine = new HotDrinkMachine(availableDrink);
machine.interact((drink) => {
  drink.consume();
});