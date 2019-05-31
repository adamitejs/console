import React from "react";
import { withRouter } from "react-router-dom";
import { Content, SubNavItem } from "../../../components/App";
import SectionHeading from "../../../components/Headings/SectionHeading";
import Section from "../../../components/Section";
import useUserList from "../../../hooks/useUserList";
import ScrollView from "../../../components/ScrollView";

function UsersPage({ history }) {
  const { loading, users } = useUserList();

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
    <Content>
      <Section className="collections" darkened>
        <SectionHeading title="Users" parentTitle="Authentication" parentTitleLink="/auth" />

        <ScrollView>
          {users.map(u => (
            <SubNavItem
              key={u.id}
              label={u.email}
              icon="user"
              onClick={() => history.push(`/auth/users/${u.id}`)}
              monospace
            />
          ))}
        </ScrollView>
      </Section>
    </Content>
  );
}

export default withRouter(UsersPage);
