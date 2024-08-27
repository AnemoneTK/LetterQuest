import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import "./styles/App.css";

import Home from "./components/Home";
import Game from "./components/Game";

function Layout() {
  return (
    <>
      <div className=" bg-background w-dvw h-dvh overflow-hidden flex gap-0 md:gap-[20px] lg:gap-[40px] p-0 md:p-[35px] lg:px-[200px]">
        <div className="canvas w-full border-0 p-5 md:border-2 bg-white rounded-2xl ">
          <Outlet />
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="game/:mode" element={<Game />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
