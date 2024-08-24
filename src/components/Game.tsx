import { generate } from "random-words";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";

export default function Game() {
  const location = useLocation();

  const { mode } = useParams();
  const [word, setWord] = useState<string>("");
  const [length, setLength] = useState<number>(0);
  const [round, setRound] = useState<number>(0);
  const [guess, setGuess] = useState<string[][]>([]);
  const [input, setInput] = useState<string>("");
  const [counter, setCounter] = useState<number>(1);

  //setup game mode when start
  useEffect(() => {
    let generatedWords;
    const queryParams = new URLSearchParams(location.search);

    if (mode === "easy") {
      generatedWords = generate({ minLength: 5, maxLength: 7 });
      setRound(10);
    } else if (mode === "normal") {
      generatedWords = generate({ minLength: 7, maxLength: 10 });
      setRound(5);
    } else if (mode === "hard") {
      generatedWords = generate({ minLength: 7, maxLength: 10 });
      setRound(5);
    } else if (mode === "custom") {
      // In custom mode, get length and round from the URL parameters
      const roundParam = queryParams.get("round");
      const lengthParam = queryParams.get("length");

      if (roundParam) {
        setRound(parseInt(roundParam, 10));
      }
      if (lengthParam) {
        setLength(parseInt(lengthParam, 10));

        generatedWords = generate({
          minLength: length,
          maxLength: length,
        });
      }
    }

    if (generatedWords) {
      if (Array.isArray(generatedWords)) {
        setWord(generatedWords[0]);
      } else {
        setWord(generatedWords);
      }
    }
    setGuess(Array.from({ length: round }, () => Array(length).fill("")));
  }, [length, location.search, mode, round]);

  const handleSubmit = () => {
    setGuess((prevGuess) => {
      const newGuess = [...prevGuess];

      const pointer = counter - 1;
      if (pointer < round) {
        newGuess[pointer] = Array.from(
          { length },
          (_, index) => input[index] || ""
        );
        // Increment the counter for the next round
        setCounter(counter + 1);
      } else {
        console.log("Maximum number of guesses reached");
      }
      return newGuess;
    });
    setInput("");
    console.log(guess);
  };

  const checkAnswer = (answer) => {};
  return (
    <>
      <div>Mode :{mode}</div>
      <div>Word :{word}</div>
      <div>
        Round :{counter}/{round}, Length:{length}
      </div>
      <div>{guess.length}</div>
      input:
      <input
        type="text"
        className="border p-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        maxLength={length}
        minLength={length}
      />
      <button className="border border-primary p-2" onClick={handleSubmit}>
        Submit
      </button>
      <div className="flex flex-col gap-3 items-center justify-center">
        {guess.map((row, rowIndex) => (
          <div key={rowIndex} className=" h-10 flex flex-row gap-3">
            {row.map((letter, index) => {
              return (
                <div
                  key={index}
                  className="border h-full w-10  flex flex-col items-center justify-center"
                >
                  {letter.toUpperCase()}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
