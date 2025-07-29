import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Account from "./pages/account/Account";
import Audio from "./pages/audio/Audio";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./authentication/AuthProvider";
// import "antd/dist/antd.css";
// import "./styles/index.scss";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/audio"
            element={
              <ProtectedRoute>
                <Audio />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
