import React, { useState } from "react";
import { withRouter, Route } from "react-router-dom";
import Toaster from "../../../components/Toaster";
import Section from "../../../components/Section";
import ScrollView from "../../../components/ScrollView";
import SectionHeading from "../../../components/Headings/SectionHeading";
import DocumentDataSection from "./DocumentDataSection";
import { SubNavItem } from "../../../components/App";
import { Button, Intent, Tooltip } from "@blueprintjs/core";
import adamite from "@adamite/sdk";
import { useReference } from "@adamite/react";
import "./DocumentsSection.scss";

function DocumentsSection({ history, match }) {
  const [collectionName, setCollectionName] = useState(match.params.collection);

  const { loading, value } = useReference(
    adamite()
      .database()
      .collection(match.params.collection)
  );

  const createDocument = async () => {
    try {
      const { id } = await adamite()
        .database()
        .collection(match.params.collection)
        .create({});

      history.push(`/database/collections/${match.params.collection}/${id}`);
    } catch (err) {
      Toaster.show({
        icon: "error",
        message: `Unable to create: ${err}`,
        intent: Intent.DANGER
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}/collections/${match.params.collection}`);
    Toaster.show({ message: "Copied collection link to clipboard.", icon: "tick" });
  };

  const copyButton = (
    <Tooltip content="Copy to Clipboard">
      <Button icon="clipboard" onClick={copyToClipboard} minimal />
    </Tooltip>
  );

  if (loading) {
    return (
      <>
        <Section className="documents">
          <SectionHeading
            title={match.params.collection}
            parentTitle="Collections"
            titleLink={`/database/collections/${match.params.collection}`}
            parentTitleLink="/database/collections"
          />
        </Section>
      </>
    );
  }

  return (
    <>
      <Section className="documents">
        <SectionHeading
          title={collectionName}
          parentTitle="Collections"
          titleLink={`/database/collections/${match.params.collection}`}
          parentTitleLink="/database/collections"
          actions={
            <>
              {copyButton}
              <Button icon="plus" minimal onClick={createDocument} />
            </>
          }
        />

        <ScrollView>
          {value.docs.map(doc => (
            <SubNavItem
              key={doc.id}
              label={doc.id}
              monospace
              onClick={() => history.push(`/database/collections/${match.params.collection}/${doc.id}`)}
              active={
                window.location.pathname.indexOf(`/database/collections/${match.params.collection}/${doc.id}`) > -1
              }
            />
          ))}
        </ScrollView>
      </Section>

      <Route path="/database/collections/:collection/:document" component={DocumentDataSection} />
    </>
  );
}

export default withRouter(DocumentsSection);
