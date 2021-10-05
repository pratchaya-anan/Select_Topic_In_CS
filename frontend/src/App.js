import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Index from "./pages/index";
import UpForm from "./pages/uploadMock";
import editForm from "./pages/editMock";
import Footer from "./components/Footer";
import Header from "./components/Header";
import detailMock from "./pages/detailMock";

function App() {
  return (
    <BrowserRouter>
    <div id="container">
        <Header/>
        <div id="main">
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/uploadmock" component={UpForm} />
            <Route path="/editMock/:id" component={editForm} />
            <Route path="/detailMock/:id" component={detailMock} />
          </Switch>
        </div>
        <Footer /> 
    </div>
    </BrowserRouter>
  );
}

export default App;