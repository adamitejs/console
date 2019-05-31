import React from "react";
import { Route, withRouter } from "react-router-dom";
import { Content, SubNavItem } from "../../../components/App";
import SectionHeading from "../../../components/Headings/SectionHeading";
import Section from "../../../components/Section";
import useCollectionList from "../../../hooks/useCollectionList";
import { Button, Classes } from "@blueprintjs/core";
import "./CollectionsPage.scss";
import DocumentsSection from "./DocumentsSection";

function CollectionsPage({ history }) {
  const { loading, collections } = useCollectionList();

  if (loading) {
    return (
      <Content>
        <Section darkened>
          <SectionHeading
            title="Collections"
            parentTitle="Database"
            titleLink="/database/collections"
            parentTitleLink="/database"
          />

          <Button large fill className={Classes.SKELETON} />
          <Button large fill className={Classes.SKELETON} />
          <Button large fill className={Classes.SKELETON} />
        </Section>
      </Content>
    );
  }

  return (
    <Content>
      <Section className="collections" darkened>
        <SectionHeading
          title="Collections"
          parentTitle="Database"
          titleLink="/database/collections"
          parentTitleLink="/database"
        />

        {collections.map(collection => (
          <SubNavItem
            key={collection}
            label={collection}
            icon="folder-close"
            monospace
            onClick={() => history.push(`/database/collections/${collection}`)}
          />
        ))}
      </Section>

      <Route path="/database/collections/:collection" component={DocumentsSection} />
    </Content>
  );
}

export default withRouter(CollectionsPage);
