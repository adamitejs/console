import React from "react";
import SubNavItem from "./SubNavItem";
import { withRouter } from "react-router-dom";
import { MenuDivider } from "@blueprintjs/core";

function AnalyticsSubNav({ history }) {
  return (
    <div className="sub-nav">
      <SubNavItem
        icon="timeline-area-chart"
        label="Events"
        onClick={() => history.push("/analytics/events")}
        active={window.location.pathname.indexOf("/analytics/events") > -1}
      />

	  <SubNavItem
        icon="pie-chart"
        label="Association Analysis"
        onClick={() => history.push("/analytics/associations")}
        active={window.location.pathname.indexOf("/analytics/associations") > -1}
      />

	  <SubNavItem
        icon="regression-chart"
        label="Regression Analysis"
        onClick={() => history.push("/analytics/regression")}
        active={window.location.pathname.indexOf("/analytics/regression") > -1}
      />

	 <SubNavItem
        icon="diagram-tree"
        label="Classification Analysis"
        onClick={() => history.push("/analytics/classification")}
        active={window.location.pathname.indexOf("/analytics/classification") > -1}
      />

      <MenuDivider />

      <SubNavItem
        icon="settings"
        label="Settings"
        onClick={() => history.push("/analytics/settings")}
        active={window.location.pathname.indexOf("/analytics/settings") > -1}
      />
    </div>
  );
}

export default withRouter(AnalyticsSubNav);
