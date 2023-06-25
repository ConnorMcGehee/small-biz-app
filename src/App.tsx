import Businesses from "./Businesses";
import { HashRouter, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import Nav from "./Nav";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <HashRouter basename="/small-biz-app">
        <Nav />
        <Routes>
          <Route path="/" element={<Businesses />} />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;