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
    apiKey: process.env.REACT_APP_API_KEY,
    apiUrl: process.env.REACT_APP_API_URL,
    databaseUrl: process.env.REACT_APP_DATABASE_URL,
    authUrl: process.env.REACT_APP_AUTH_URL
  });

// make adamite available globally for debugging
global.adamite = adamite;

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
