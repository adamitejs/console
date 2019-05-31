import React, { useState } from "react";
import { Login, Register, useAuthState } from "@adamite/react";
import { withRouter, Switch, Route } from "react-router-dom";
import { Button, Tooltip, Position } from "@blueprintjs/core";
import SectionHeading from "../../Headings/SectionHeading";
import DatabaseSubNav from "./DatabaseSubNav";
import classNames from "classnames";
import "./Nav.scss";
import adamite from "@adamite/sdk";
import AuthSubNav from "./AuthSubNav";

function RootNavItem({ icon, label, active, onClick }) {
  return (
    <Tooltip content={label} position={Position.LEFT} hoverOpenDelay={800}>
      <Button large minimal icon={icon} onClick={onClick} className={classNames({ active })} />
    </Tooltip>
  );
}

function Nav({ history, match }) {
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const { user } = useAuthState();
  const [createAccountVisible, setCreateAccountVisible] = useState(false);

  const showSidebar = () => {
    setSidebarHidden(false);
    document.body.classList.remove("sidebar-hidden");
  };

  const hideSidebar = () => {
    setSidebarHidden(true);
    document.body.classList.add("sidebar-hidden");
  };

  return (
    <>
      <Login
        isOpen={loginVisible}
        onCreateAccountClick={() => {
          setLoginVisible(false);
          setCreateAccountVisible(true);
        }}
        onClose={() => setLoginVisible(false)}
      />

      <Register
        isOpen={createAccountVisible}
        onSignInClick={() => {
          setCreateAccountVisible(false);
          setLoginVisible(true);
        }}
        onClose={() => setCreateAccountVisible(false)}
      />

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
              label="Authentication"
              onClick={() => history.push("/auth")}
              active={window.location.pathname.indexOf("/auth") > -1}
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
            <Route path="/auth" component={AuthSubNav} />
          </Switch>
        </div>

        <div className="navigation">
          <div className="root-nav">
            {sidebarHidden && <RootNavItem icon="chevron-right" label="Open Sidebar" onClick={showSidebar} />}
            {!user && <RootNavItem icon="log-in" label="Login as User" onClick={() => setLoginVisible(true)} />}
            {user && (
              <RootNavItem
                icon="log-out"
                label={`Logged in as ${user.email}`}
                onClick={() =>
                  adamite()
                    .auth()
                    .logout()
                }
              />
            )}
            <RootNavItem icon="help" label="Help" onClick={() => history.push("/help")} />
          </div>
        </div>
      </nav>
    </>
  );
}

export default withRouter(Nav);
