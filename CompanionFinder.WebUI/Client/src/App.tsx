import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./feature/home";
import ChatPage from "./feature/chat";
import AdminPage from "./feature/admin";
import { ToastContainer } from "react-toastify";
import DefaultLayout from "./components/containers/defaultLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </BrowserRouter>
    </>
  );
}

export default App;
