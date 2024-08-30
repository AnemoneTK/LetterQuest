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
      generatedWords = generate({ minLength: 5, maxLength: 5 });
      setRound(10);
      setLength(generatedWords.length);
    } else if (mode === "normal" || mode === "hard") {
      generatedWords = generate({ minLength: 5, maxLength: 7 });
      setRound(7);
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
        newGuess[pointer] = Array.from({ length }, (_, index) =>
          input[index] ? input[index].toLowerCase() : ""
        );
        // Increment the counter for the next round
        return newGuess;
      });
      const answer = word.join("");
      if (counter == round) {
        if (input.toLowerCase() == answer) {
          setResult("win");
        } else {
          setResult("loss");
        }
        setPopup(true);
      } else if (counter < round) {
        if (input.toLowerCase() == answer) {
          setResult("win");
          setPopup(true);
        } else {
          setCounter(counter + 1);
        }
      }
      setInput("");
    } else {
      alert("No input");
    }
  };

  return (
    <>
      <div className={`popup w-2/3 md:w-[40dvw]  ${popup ? "active" : ""}`}>
        <Popup
          mode={mode}
          counter={counter}
          round={round}
          result={result}
          word={word.join("")}
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
            strokeWidth="2"
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
        <div className="text-4xl font-extrabold mt-12 md:mt-7">
          {mode?.toUpperCase()}
        </div>
        <div className="text-4xl ">
          Round :{" "}
          <span
            className={`${
              counter >= round - 2 && counter != round
                ? "text-orange"
                : counter == round
                ? "text-hard"
                : "text-primary"
            } font-bold`}
          >
            {counter} / {round}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-5">
        <input
          type="text"
          className="border p-2 rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={length}
          minLength={length}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          autoFocus
        />
        <p className="mt-1 opacity-50">press Enter or Return to submit</p>
      </div>
      <div className="h-3/4 overflow-auto p-5 ">
        <div
          className="flex flex-col gap-3 items-center justify-items-start "
          style={{ maxHeight: "80dvh" }}
        >
          {guess.map((row, rowIndex) => (
            <div key={rowIndex} className=" h-6 md:h-10  flex flex-row gap-3">
              {row.map((letter, index) => {
                return (
                  <div
                    key={index}
                    className={`border rounded-md h-6 md:h-10 w-full aspect-[1]  flex flex-col items-center justify-center
                    ${
                      mode === "hard"
                        ? word.includes(letter) &&
                          letter !== word[index] &&
                          word.filter((l) => l === letter).length == 1
                          ? "bg-yellow"
                          : word.includes(letter) &&
                            row[index] !== word[index] &&
                            word.filter((l) => l === letter).length > 1
                          ? "bg-orange"
                          : ""
                        : word.includes(letter) &&
                          letter !== word[index] &&
                          word.filter((l) => l === letter).length == 1
                        ? "bg-yellow"
                        : letter === word[index]
                        ? "bg-green"
                        : word.includes(letter) &&
                          row[index] !== word[index] &&
                          word.filter((l) => l === letter).length > 1
                        ? "bg-orange"
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
      </div>
    </>
  );
}
