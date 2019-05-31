import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CollectionsPage from "../../pages/Database/Collections/CollectionsPage";
import UsersPage from "../../pages/Auth/Users/UsersPage";

function Routes() {
  return (
    <Switch>
      <Route exact path="/database" render={() => <Redirect to="/database/collections" />} />
      <Route path="/database/collections" component={CollectionsPage} />

      <Route exact path="/auth" render={() => <Redirect to="/auth/users" />} />
      <Route path="/auth/users" component={UsersPage} />
    </Switch>
  );
}

export default Routes;
