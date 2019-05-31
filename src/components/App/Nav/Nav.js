import React, { useState } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { Button, Tooltip, Position } from "@blueprintjs/core";
import SectionHeading from "../../Headings/SectionHeading";
import DatabaseSubNav from "./DatabaseSubNav";
import classNames from "classnames";
import "./Nav.scss";

function RootNavItem({ icon, label, active, onClick }) {
  return (
    <Tooltip content={label} position={Position.RIGHT} hoverOpenDelay={800}>
      <Button large minimal icon={icon} onClick={onClick} className={classNames({ active })} />
    </Tooltip>
  );
}

function Nav({ history, match }) {
  const [sidebarHidden, setSidebarHidden] = useState(false);

  const showSidebar = () => {
    setSidebarHidden(false);
    document.body.classList.remove("sidebar-hidden");
  };

  const hideSidebar = () => {
    setSidebarHidden(true);
    document.body.classList.add("sidebar-hidden");
  };

  return (
    <nav className="nav">
      <div className="app-info">
        <div className="app-icon">YA</div>
        <div className="app-details">
          <SectionHeading
            title="Your App"
            parentTitle="Adamite"
            parentTitleLink="/"
            actions={!sidebarHidden && <Button icon="chevron-left" minimal onClick={hideSidebar} />}
          />
        </div>
      </div>

      <div className="navigation flex">
        <div className="root-nav">
          <RootNavItem
            icon="database"
            label="Database"
            onClick={() => history.push("/database")}
            active={window.location.pathname.indexOf("/database") > -1}
          />
          <RootNavItem
            icon="people"
            label="Users"
            onClick={() => history.push("/users")}
            active={window.location.pathname.indexOf("/users") > -1}
          />
          <RootNavItem
            icon="function"
            label="Functions"
            onClick={() => history.push("/functions")}
            active={window.location.pathname.indexOf("/functions") > -1}
          />
        </div>

        <Switch>
          <Route path="/database" component={DatabaseSubNav} />
        </Switch>
      </div>

      <div className="navigation">
        <div className="root-nav">
          {sidebarHidden && <RootNavItem icon="chevron-right" label="Open Sidebar" onClick={showSidebar} />}
          <RootNavItem icon="help" label="Help" onClick={() => history.push("/help")} />
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Nav);
