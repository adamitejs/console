import React from "react";
import Nav from "./Nav/Nav";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { FocusStyleManager } from "@blueprintjs/core";
import "./App.css";
import adamite, { AuthPlugin, DatabasePlugin } from "@adamite/sdk";

adamite()
  .use(DatabasePlugin)
  .use(AuthPlugin)
  .initializeApp({
    apiKey: "NzgwNjBkZGItNjcwYS00NDMyLThjYjEtZWNlOWNiMTViMGNh",
    apiUrl: "http://localhost:9000",
    databaseUrl: "http://localhost:9001",
    authUrl: "http://localhost:9002"
  });

function App() {
  FocusStyleManager.onlyShowFocusOnTabs();

  return (
    <Router>
      <Nav />
      <Routes />
    </Router>
  );
}

export default App;
