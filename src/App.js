import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
// import './App.css';
import Convert from "./Convert";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Convert />
        {/* <h2>Start editing to see some magic happen {"\u2728"}</h2>
        <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js'>
        <Viewer fileUrl={url}/>
        </Worker> */}
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
