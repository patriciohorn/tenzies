import Die from './die';

export default function App() {
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

        <div className="tenzie--dices">
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
          <Die value="1" />
        </div>
        <button>Roll</button>
      </section>
    </main>
  );
}
