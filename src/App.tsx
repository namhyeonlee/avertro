import React from "react";
import { Routes, Route } from "react-router-dom";
import "styles/global.scss";
import "styles/pageStyle.scss";
import Layout from "components/layout/Layout";
import MainPage from "pages/MainPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
