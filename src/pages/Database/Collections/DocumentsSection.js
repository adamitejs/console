import React from "react";
import { withRouter, Route } from "react-router-dom";
import Section from "../../../components/Section";
import SectionHeading from "../../../components/Headings/SectionHeading";
import DocumentDataSection from "./DocumentDataSection";
import { SubNavItem } from "../../../components/App";
import adamite from "@adamite/sdk";
import { useReference } from "@adamite/react";
import "./DocumentsSection.scss";

function DocumentsSection({ history, match }) {
  const { loading, value } = useReference(
    adamite()
      .database()
      .collection(match.params.collection)
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
          title={match.params.collection}
          parentTitle="Collections"
          titleLink={`/database/collections/${match.params.collection}`}
          parentTitleLink="/database/collections"
        />

        {value.docs.map(doc => (
          <SubNavItem
            key={doc.id}
            label={doc.id}
            monospace
            onClick={() => history.push(`/database/collections/${match.params.collection}/${doc.id}`)}
          />
        ))}
      </Section>

      <Route path="/database/collections/:collection/:document" component={DocumentDataSection} />
    </>
  );
}

export default withRouter(DocumentsSection);
