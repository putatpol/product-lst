import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import axios from "axios";

function App() {
 
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
}

export default App;
