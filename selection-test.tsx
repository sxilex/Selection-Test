import { useState } from "react";

export default function App() {
  try {
    const initDoms = [
      [6, 1],
      [4, 3],
      [5, 1],
      [3, 4],
      [1, 1],
      [3, 4],
      [1, 2],
    ];
    const [dominoes, setDominoes] = useState(initDoms);
    const [removeNumber, setRemoveNumber] = useState("");
    const [newDomino, setNewDomino] = useState({ left: "", right: "" });

    const countDoubleNumber = (dominoes) => {
      return [dominoes].filter(([a, b]) => a === b).length;
    };

    const flipDominoes = () => {
      const flippedCards = dominoes.map(([a, b]) => [b, a]);
      setDominoes(flippedCards);
    };

    const sortByAsc = () => {
      const sorted = [...dominoes].sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
      setDominoes(sorted);
    };

    const sortByDsc = () => {
      const sorted = [...dominoes].sort((a, b) => b[0] + b[1] - (a[0] + a[1]));
      setDominoes(sorted);
    };
    const resetDoms = () => {
      setDominoes(initDoms);
    };

    const deleteDuplicate = () => {
      const count = {};
      dominoes.forEach(([a, b]) => {
        const key = [a, b].sort().join(",");
        count[key] = (count[key] || 0) + 1;
      });
      setDominoes(
        dominoes.filter(([a, b]) => count[[a, b].sort().join(",")] === 1)
      );
    };

    const removeBySum = () => {
      const inputNumber = parseInt(removeNumber);
      if (!isNaN(inputNumber)) {
        setDominoes(dominoes.filter(([a, b]) => a + b !== inputNumber));
      } else {
        alert(`Input is Not Valid`);
      }
    };

    const setZero = () => {
      setDominoes([]);
    };

    const insertNew = () => {
      const left = parseInt(newDomino.left);
      const right = parseInt(newDomino.right);
      if (!isNaN(left) && !isNaN(right)) {
        setDominoes([...dominoes, [left, right]]);
        setNewDomino({ left: "", right: "" });
      }
    };

    return (
      <div className="p-6 w-screen mx-auto bg-black text-white min-h-screen">
        <div className="text-xl font-bold mb-2">Dominoes</div>
        <div className="border p-2 mb-2">
          <strong>Original Set Of Dominoes</strong>
          <br />
          {JSON.stringify(initDoms)}
        </div>

        <div className="border p-2 mb-4">
          <strong>Double Numbers</strong>
          <br />
          {countDoubleNumber(dominoes)}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {dominoes.map(([a, b], idx) => (
            <div key={idx} className="border p-1 w-10 text-center">
              {a}
              <br />-<br />
              {b}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <button onClick={flipDominoes}>Flip</button>
          <button onClick={sortByAsc}>Sort by Ascending</button>
          <button onClick={sortByDsc}>Sort by Decending</button>
          <button onClick={deleteDuplicate}>Delete Duplicate</button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="number"
            className="border p-2 w-20"
            placeholder="Left"
            value={newDomino.left}
            onChange={(e) =>
              setNewDomino({ ...newDomino, left: e.target.value })
            }
          />
          <input
            type="number"
            className="border p-2 w-20"
            placeholder="Right"
            value={newDomino.right}
            onChange={(e) =>
              setNewDomino({ ...newDomino, right: e.target.value })
            }
          />
          <button onClick={insertNew}>Input New Card</button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="border p-2 flex-1"
            placeholder="Input Number"
            value={removeNumber}
            onChange={(e) => setRemoveNumber(e.target.value)}
          />
          <button onClick={removeBySum}>Remove Sum</button>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <button onClick={resetDoms}>Reset to Original</button>
          <button onClick={setZero}>Reset to Zero</button>
        </div>
      </div>
    );
  } catch (error) {}
}
