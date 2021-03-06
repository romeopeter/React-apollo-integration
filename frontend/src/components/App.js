import React from "react";
import LinkList from "./LinkList";
import CreateLink from "./CreateLink";
import Header from "./Header";
import Login from './Login';
import Search from './Search';
import { Routes, Route } from "react-router-dom";
import "../styles/App.css";

function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Routes>
          <Route path="/" element={<LinkList/>} />
          <Route path="/create" element={<CreateLink/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/search" element={<Search/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;