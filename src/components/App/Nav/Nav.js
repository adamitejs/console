import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Tooltip, Position, MenuDivider } from "@blueprintjs/core";
import SectionHeading from "../../Headings/SectionHeading";
import SubNavItem from "./SubNavItem";
import "./Nav.scss";

function RootNavItem({ icon, label, onClick }) {
  return (
    <Tooltip content={label} position={Position.RIGHT} hoverOpenDelay={800}>
      <Button large minimal icon={icon} onClick={onClick} />
    </Tooltip>
  );
}

function Nav({ history }) {
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
          <RootNavItem icon="database" label="Database" onClick={() => history.push("/database")} />
          <RootNavItem icon="people" label="Users" onClick={() => history.push("/users")} />
          <RootNavItem icon="function" label="Functions" onClick={() => history.push("/functions")} />
        </div>

        <div className="sub-nav">
          <SubNavItem icon="folder-close" label="Collections" onClick={() => history.push("/database/collections")} />
          <SubNavItem icon="lock" label="Rules" onClick={() => history.push("/database/rules")} />
          <SubNavItem icon="vertical-bar-chart-asc" label="Usage" onClick={() => history.push("/database/usage")} />
          <MenuDivider />
          <SubNavItem icon="share" label="RethinkDB" />
          <SubNavItem icon="settings" label="Settings" onClick={() => history.push("/database/settings")} />
        </div>
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
