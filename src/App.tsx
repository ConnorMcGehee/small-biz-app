import Businesses from "./Businesses";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import Nav from "./Nav";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Businesses />} />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;