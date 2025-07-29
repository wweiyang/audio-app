import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Audio from "./pages/Audio";
// import "./styles/index.scss";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/audio" element={<Audio />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
