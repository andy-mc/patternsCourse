const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

interface IDrink {
  consume(): void;
}

class Tea implements IDrink {
  consume() {
    console.log('This tea is nice with lemon!');
  }
}

class Coffee implements IDrink {
  consume() {
    console.log("This coffee is delicious!");
  }
}

class Matcha implements IDrink {
  consume() {
    console.log("This matcha is delicious!");
  }
}

interface IDrinkFactory {
  prepare(amount: number): IDrink;
}

class TeaFactory implements IDrinkFactory {
  prepare(amount: number): IDrink {
    console.log("Grind some leaves, boil water, pour ${amount} ml");
    return new Tea();
  }
}

class CoffeeFactory implements IDrinkFactory {
  prepare(amount: number): IDrink {
    console.log("Grind some beans, boil water, pour ${amount} ml");
    return new Coffee();
  }
}

class MatchaFactory implements IDrinkFactory {
  prepare(amount: number): IDrink {
    console.log("Do a lot of ceremony, pour ${amount} ml of hot water");
    return new Matcha();
  }
}

class HotDrinkMachine {
  private factories: { [key: string]: IDrinkFactory };

  constructor(availableDrink: { [key: string]: new() => IDrinkFactory }) {
    this.factories = {};
    for (let drink in availableDrink) {
      this.factories[drink] = new availableDrink[drink]();
    }
  }

  interact(consumer: (drink: IDrink) => void) {
    rl.question('Please specify drink and amount (e.g., tea 50): ', answer => {
      let parts = answer.split(' ');
      let name = parts[0];
      let amount = parseInt(parts[1]);
      let d = this.factories[name].prepare(amount);
      rl.close();
      consumer(d);
    });
  }
}

const availableDrink = Object.freeze({
  coffee: CoffeeFactory,
  tea: TeaFactory,
  matcha: MatchaFactory
});

let machine = new HotDrinkMachine(availableDrink);
machine.interact((drink) => {
  drink.consume();
});