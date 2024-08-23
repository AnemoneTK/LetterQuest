import "./styles/App.css";
import Home from "./components/Home";

function App() {
  return (
    <>
      <div className=" bg-background w-dvw h-dvh overflow-hidden flex gap-0 md:gap-[20px] lg:gap-[40px] p-0 md:p-[35px] lg:px-[200px]">
        <div className="canvas w-full border-0 md:border-2 bg-white rounded-2xl p-0 md:p-5">
          <Home />
        </div>
      </div>
    </>
  );
}

export default App;
