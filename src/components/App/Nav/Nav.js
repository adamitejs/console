import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Tooltip, Position, MenuDivider } from "@blueprintjs/core";
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
  return (
    <nav className="nav">
      <div className="app-info">
        <div className="app-icon">YA</div>
        <div className="app-details">
          <h3>Your App</h3>
          <h5>Adamite</h5>
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
          <RootNavItem icon="help" label="Help" onClick={() => history.push("/help")} />
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Nav);
