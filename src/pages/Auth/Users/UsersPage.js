import React, { useState } from "react";
import { Route, withRouter } from "react-router-dom";
import { Content, SubNavItem } from "../../../components/App";
import SectionHeading from "../../../components/Headings/SectionHeading";
import Section from "../../../components/Section";
import useUserList from "../../../hooks/useUserList";
import ScrollView from "../../../components/ScrollView";
import { Button } from "@blueprintjs/core";
import CreateUserDialog from "./CreateUserDialog";
import adamite from "@adamite/sdk";
import UserDataSection from "./UserDataSection";

function UsersPage({ history }) {
  const [addUserOpen, setAddUserOpen] = useState(false);
  const { loading, users, refresh } = useUserList();

  const createUser = async ({ email, password }) => {
    await adamite()
      .auth()
      .createUser(email, password, null, true);
    refresh();
  };

  if (loading) {
    return (
      <Content>
        <Section className="collections" darkened>
          <SectionHeading title="Users" parentTitle="Authentication" parentTitleLink="/auth" />
        </Section>
      </Content>
    );
  }

  return (
    <>
      <CreateUserDialog isOpen={addUserOpen} onClose={() => setAddUserOpen(false)} onSubmit={createUser} />

      <Content>
        <Section className="collections" darkened>
          <SectionHeading
            title="Users"
            parentTitle="Authentication"
            parentTitleLink="/auth"
            actions={<Button icon="plus" minimal onClick={() => setAddUserOpen(true)} />}
          />

          <ScrollView>
            {users.map(u => (
              <SubNavItem
                key={u.id}
                label={u.email}
                icon="user"
                onClick={() => history.push(`/auth/users/${u.id}`)}
                active={window.location.pathname.indexOf(`/auth/users/${u.id}`) > -1}
                monospace
              />
            ))}
          </ScrollView>
        </Section>

        <Route render={props => <UserDataSection {...props} onRefresh={refresh} />} path="/auth/users/:user" />
      </Content>
    </>
  );
}

export default withRouter(UsersPage);
