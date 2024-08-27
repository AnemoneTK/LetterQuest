import { generate } from "random-words";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { Link } from "react-router-dom";

import Popup from "./Popup";

export default function Game() {
  const location = useLocation();

  const { mode } = useParams<string>();
  const [word, setWord] = useState<string[]>([]);
  const [length, setLength] = useState<number>(0);
  const [round, setRound] = useState<number>(0);
  const [guess, setGuess] = useState<string[][]>([]);
  const [input, setInput] = useState<string>("");
  const [counter, setCounter] = useState<number>(1);
  const [popup, setPopup] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");

  //setup game mode when start
  useEffect(() => {
    let generatedWords;
    const queryParams = new URLSearchParams(location.search);

    if (mode === "easy") {
      generatedWords = generate({ minLength: 5, maxLength: 7 });
      setRound(10);
      setLength(generatedWords.length);
    } else if (mode === "normal") {
      generatedWords = generate({ minLength: 7, maxLength: 10 });
      setRound(5);
      setLength(generatedWords.length);
    } else if (mode === "hard") {
      generatedWords = generate({ minLength: 7, maxLength: 10 });
      setRound(5);
      setLength(generatedWords.length);
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
        setWord(generatedWords[0].split(""));
      } else {
        setWord(generatedWords.split(""));
      }
    }
    setGuess(Array.from({ length: round }, () => Array(length).fill("")));
  }, [length, location.search, mode, round]);

  useEffect(() => {
    if (word.length > 0) {
      setGuess(
        Array.from({ length: round }, () => Array(word.length).fill(""))
      );
    }
  }, [word, round]);

  const handleSubmit = async () => {
    if (input) {
      setGuess((prevGuess) => {
        const newGuess = [...prevGuess];

        const pointer = counter - 1;
        newGuess[pointer] = Array.from(
          { length },
          (_, index) => input[index].toLowerCase() || ""
        );
        // Increment the counter for the next round
        return newGuess;
      });
      const answer = word.join("");
      if (counter === round) {
        if (input === answer) {
          setResult("Win");
        } else {
          setResult("Loss");
        }
        setPopup(true);
      } else {
        if (input === answer) {
          setResult("Win");
          setPopup(true);
        } else {
          setCounter(counter + 1);
        }
      }
      setInput("");
    } else {
      alert("No input");
    }

    //check answer
  };

  return (
    <>
      <div className={`popup w-2/3 md:w-1/3 ${popup ? "active" : ""}`}>
        <Popup
          mode={mode}
          counter={counter}
          round={round}
          result={result}
          setPopup={setPopup}
        />
      </div>
      <div className="flex justify-center items-center absolute">
        <Link
          to={"/"}
          className="flex flex-row justify-center items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.7"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl md:text-4xl font-bold my-3">
          {mode?.toUpperCase()}
        </div>
        <div className="text-4xl">
          Round : {counter} / {round}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center py-5">
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
      </div>
      <div className="flex flex-col gap-3 items-center justify-center">
        {guess.map((row, rowIndex) => (
          <div key={rowIndex} className=" h-10 flex flex-row gap-3">
            {row.map((letter, index) => {
              return (
                <div
                  key={index}
                  className={`border rounded-md h-full w-10  flex flex-col items-center justify-center
                    ${
                      mode === "hard"
                        ? word.includes(letter) &&
                          row.join("") !== word.join("")
                          ? "bg-yellow"
                          : row.join("") === word.join("")
                          ? "bg-green"
                          : ""
                        : word.includes(letter) && letter !== word[index]
                        ? "bg-yellow"
                        : letter === word[index]
                        ? "bg-green"
                        : ""
                    }`}
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
