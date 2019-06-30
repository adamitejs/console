import React, { useState } from "react";
import { Route, withRouter } from "react-router-dom";
import { Content, SubNavItem } from "../../../components/App";
import SectionHeading from "../../../components/Headings/SectionHeading";
import Section from "../../../components/Section";
import useCollectionList from "../../../hooks/useCollectionList";
import { Button, Classes } from "@blueprintjs/core";
import "./EventsPage.scss";
import adamite from "@adamite/sdk";

function EventsPage({ history }) {
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
      <>
	  </>
    );
  }

  return (
    <>
      <Content>
        <Section darkened>
          
        </Section>
      </Content>
    </>
  );
}

export default withRouter(EventsPage);
