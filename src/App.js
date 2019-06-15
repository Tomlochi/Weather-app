import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Master from "./components/containers/Master";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Master />
      </BrowserRouter>
    </div>
  );
}

export default App;
