import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import Die from './die';

export default function App() {
  const [dice, setDice] = useState(allNewDice());

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
          Roll
        </button>
      </section>
    </main>
  );
}
