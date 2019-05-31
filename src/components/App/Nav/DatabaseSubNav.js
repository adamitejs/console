import React from "react";
import SubNavItem from "./SubNavItem";
import { withRouter } from "react-router-dom";
import { MenuDivider } from "@blueprintjs/core";

function DatabaseSubNav({ history }) {
  return (
    <div className="sub-nav">
      <SubNavItem
        icon="folder-close"
        label="Collections"
        onClick={() => history.push("/database/collections")}
        active={window.location.pathname.indexOf("/database/collections") > -1}
      />

      <SubNavItem
        icon="lock"
        label="Rules"
        onClick={() => history.push("/database/rules")}
        active={window.location.pathname.indexOf("/database/rules") > -1}
      />

      <SubNavItem
        icon="vertical-bar-chart-asc"
        label="Usage"
        onClick={() => history.push("/database/usage")}
        active={window.location.pathname.indexOf("/database/usage") > -1}
      />

      <MenuDivider />

      <SubNavItem icon="share" label="RethinkDB" />

      <SubNavItem
        icon="settings"
        label="Settings"
        onClick={() => history.push("/database/settings")}
        active={window.location.pathname.indexOf("/database/settings") > -1}
      />
    </div>
  );
}

export default withRouter(DatabaseSubNav);
