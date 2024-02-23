import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import Die from './Die';
import Confetti from 'react-confetti';

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  // This effect is running every single time the dice array change. Which means it ran every single time I clicke on one of the dice and every single time I clicked roll button. Using use effect becaus we're syncing 2 internal states ():

  // We check all of the dices every single time something changes in the dice, to look for winning condition and if the game has been won (allValues the same and all dices are held), we can set tenzies to true therefore the user win the game.
  // Why useEffect? Keeping two internal states in sync with each other is a really common use of useEffect.
  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log('You Won!');
    }
  }, [dice]);

  function generateNewDie() {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    setDice((prevState) => prevState.map((die) => (die.isHeld ? die : generateNewDie())));
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    );
  }

  const diceElements = dice.map((die, i) => {
    return (
      <Die
        key={die.id}
        id={die.id}
        value={die.value}
        holdDice={() => holdDice(die.id)} // to know which dice is selected and use it id on holdDice fn
        isHeld={die.isHeld} //
      />
    );
  });

  return (
    <main>
      {tenzies && <Confetti />}
      <section className="tenzie">
        <div>
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its current value
            between rolls.
          </p>
        </div>

        <div className="tenzie--dices">{diceElements}</div>
        <button className="roll-dice" onClick={rollDice}>
          {tenzies ? 'New Game' : 'Roll'}
        </button>
      </section>
    </main>
  );
}
