import React from "react";
import Section from "../../../components/Section";
import SectionHeading from "../../../components/Headings/SectionHeading";
import { SubNavItem } from "../../../components/App";
import { useReference } from "@adamite/react";
import adamite from "@adamite/sdk";
import "./DocumentDataSection.scss";

function DocumentDataSection({ match }) {
  const { loading, value } = useReference(
    adamite()
      .database()
      .collection(match.params.collection)
      .doc(match.params.document)
  );

  if (loading) {
    return (
      <>
        <Section className="documents">
          <SectionHeading
            title={match.params.document}
            parentTitle={match.params.collection}
            titleLink={`/database/collections/${match.params.collection}/${match.params.document}`}
            parentTitleLink={`/database/collections/${match.params.collection}`}
          />
        </Section>
      </>
    );
  }

  return (
    <>
      <Section className="document-data">
        <SectionHeading
          title={match.params.document}
          parentTitle={match.params.collection}
          titleLink={`/database/collections/${match.params.collection}/${match.params.document}`}
          parentTitleLink={`/database/collections/${match.params.collection}`}
        />

        <pre>
          <code>{JSON.stringify(value.data, null, 2)}</code>
        </pre>
      </Section>
    </>
  );
}

export default DocumentDataSection;
