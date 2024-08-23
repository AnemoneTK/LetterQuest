interface Props {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  name: string;
}
function ModeBtn({ mode, setMode, name }: Props) {
  return (
    <div
      className={`primary-btn-border z-10 ${
        mode === name.toLowerCase() ? "active" : ""
      } `}
      onClick={() => setMode(name.toLowerCase())}
    >
      {mode === name.toLowerCase() ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="currentColor"
          className="absolute left-7 size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      ) : (
        ""
      )}
      <div>{name}</div>
    </div>
  );
}

export default function Setting({ mode, setMode }: Props) {
  return (
    <>
      <div className="w-72 flex flex-col gap-2 md:gap-12 ">
        <div className="flex flex-col gap-2 items-center justify-center w-full">
          <ModeBtn mode={mode} setMode={setMode} name={"Easy"} />
          <ModeBtn mode={mode} setMode={setMode} name={"Normal"} />
          <ModeBtn mode={mode} setMode={setMode} name={"Hard"} />
        </div>
        <div className="flex flex-col items-center justify-center w-full h-auto ">
          <ModeBtn mode={mode} setMode={setMode} name={"Custom"} />
          <div
            className={`customBox flex flex-row items-center justify-center gap-3 ${
              mode === "custom" ? "active" : ""
            }`}
          >
            <div className="flex flex-col items-center justify-center">
              <label className="text-sm">Length</label>
              <input className="customInput" type="number" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <label className="text-sm">Round</label>
              <input className="customInput" type="number" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
