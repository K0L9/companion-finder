import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import HomePage from "./feature/home";
import ChatPage from "./feature/chat";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </>
  );
}

export default App;
