interface Props {
  mode: string | undefined;
  counter: number;
  round: number;
  result: string;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Popup({
  mode,
  counter,
  round,
  result,
  setPopup,
}: Props) {
  return (
    <>
      <div className="  bg-white  border rounded-md p-5  flex flex-col justify-center items-center">
        <div>Mode</div>
        <div className="text-4xl">{mode?.toUpperCase()}</div>
        <div>{result}</div>
        <div>
          {counter} / {round}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3">
          <button className="primary-btn">Play Again</button>
          <button className="primary-btn-border">Back</button>
        </div>
      </div>
    </>
  );
}
