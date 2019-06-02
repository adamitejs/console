import React from "react";
import SubNavItem from "./SubNavItem";
import { withRouter } from "react-router-dom";
import { MenuDivider } from "@blueprintjs/core";

function AuthSubNav({ history }) {
  return (
    <div className="sub-nav">
      <SubNavItem
        icon="people"
        label="Users"
        onClick={() => history.push("/auth/users")}
        active={window.location.pathname.indexOf("/auth/users") > -1}
      />

      <MenuDivider />

      <SubNavItem
        icon="settings"
        label="Settings"
        onClick={() => history.push("/auth/settings")}
        active={window.location.pathname.indexOf("/auth/settings") > -1}
      />
    </div>
  );
}

export default withRouter(AuthSubNav);
