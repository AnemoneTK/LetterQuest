import { Link } from "react-router-dom";

interface Props {
  mode: string | undefined;
  counter: number;
  round: number;
  result: string;
  word: string;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Popup({
  mode,
  counter,
  round,
  result,
  word,
  setPopup,
}: Props) {
  return (
    <>
      <div className="  bg-white  border rounded-md p-5  flex flex-col justify-center items-center">
        <div>Mode</div>
        <div className="text-2xl">{mode?.toUpperCase()}</div>
        <div
          className={`text-4xl md:text-5xl font-bold my-2 ${
            result === "win" ? "text-easy" : "text-hard"
          }`}
        >
          {result.toUpperCase()}
        </div>
        <div className=" text-xl md:text-2xl">
          Round : {counter} / {round}
        </div>
        <div className="text-2xl mt-2 text-center my-5">
          Answer <br />
          <span className="text-4xl md:text-6xl font-bold">
            {word.toUpperCase()}
          </span>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3 mt-2">
          <button
            className="primary-btn"
            onClick={() => {
              setPopup(false);
              setTimeout(() => {
                window.location.reload();
              }, 300);
            }}
          >
            Play Again
          </button>
          <Link to={"/"} className="primary-btn-border">
            Back
          </Link>
        </div>
      </div>
    </>
  );
}
