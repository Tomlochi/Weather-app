import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Master from "./components/containers/Master";
import AppLoading from "./components/containers/AppLodaing";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppLoading />
        <Master />
      </BrowserRouter>
    </div>
  );
}

export default App;
