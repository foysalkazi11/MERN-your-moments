import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Home,
  CampGround,
  NavBar,
  SingleGround,
  AddCampGround,
  UpdateGround,
  Footer,
  ErrorPage,
  SignUp,
  Login
} from "./components/AllComponents";
import { Authenticated } from "./protectRoute/Authenticated";
import { ToastContainer } from "./utility/notification";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <NavBar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/campground" component={CampGround} />
        <Route exact path="/campground/:id" component={SingleGround} />

        <Authenticated exact path="/addGround" component={AddCampGround} />

        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route
          exact
          path="/campground/:id/updateGround"
          component={UpdateGround}
        />
        <Route exact path="*" component={ErrorPage} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
