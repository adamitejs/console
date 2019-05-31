import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CollectionsPage from "../../pages/Database/Collections/CollectionsPage";

function Routes() {
  return (
    <Switch>
      <Route exact path="/database" render={() => <Redirect to="/database/collections" />} />
      <Route path="/database/collections" component={CollectionsPage} />
    </Switch>
  );
}

export default Routes;
