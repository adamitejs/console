import React, { useState } from "react";
import { Route, withRouter } from "react-router-dom";
import { Content, SubNavItem } from "../../../components/App";
import SectionHeading from "../../../components/Headings/SectionHeading";
import Section from "../../../components/Section";
import useCollectionList from "../../../hooks/useCollectionList";
import { Button, Classes } from "@blueprintjs/core";
import DocumentsSection from "./DocumentsSection";
import CreateCollectionDialog from "./CreateCollectionDialog";
import "./CollectionsPage.scss";
import adamite from "@adamite/sdk";

function CollectionsPage({ history }) {
  const [addCollectionOpen, setAddCollectionOpen] = useState(false);
  const { loading, collections, refresh } = useCollectionList();

  const createCollection = async ({ collectionName, initialDocument }) => {
    const { id } = await adamite()
      .database()
      .collection(collectionName)
      .create(initialDocument);

    refresh();
    history.push(`/database/collections/${collectionName}/${id}`);
  };

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
    <>
      <CreateCollectionDialog
        isOpen={addCollectionOpen}
        onClose={() => setAddCollectionOpen(false)}
        onSubmit={createCollection}
      />

      <Content>
        <Section className="collections" darkened>
          <SectionHeading
            title="Collections"
            parentTitle="Database"
            titleLink="/database/collections"
            parentTitleLink="/database"
            actions={<Button icon="plus" minimal onClick={() => setAddCollectionOpen(true)} />}
          />

          {collections.map(collection => (
            <SubNavItem
              key={collection}
              label={collection}
              icon="folder-close"
              monospace
              onClick={() => history.push(`/database/collections/${collection}`)}
              active={window.location.pathname.indexOf(`/database/collections/${collection}`) > -1}
            />
          ))}
        </Section>

        <Route path="/database/collections/:collection" component={DocumentsSection} />
      </Content>
    </>
  );
}

export default withRouter(CollectionsPage);
