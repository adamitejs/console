import React, { useState } from "react";
import { Button, Intent, Popover, Menu, ButtonGroup, Position, Tooltip } from "@blueprintjs/core";
import Toaster from "../../../components/Toaster";
import Section from "../../../components/Section";
import SectionHeading from "../../../components/Headings/SectionHeading";
import ReactJson from "react-json-view";
import { useReference } from "@adamite/react";
import adamite from "@adamite/sdk";
import "./DocumentDataSection.scss";

function DocumentDataSection({ match, history }) {
  const { loading, value } = useReference(
    adamite()
      .database()
      .collection(match.params.collection)
      .doc(match.params.document)
  );

  const saveChanges = async e => {
    try {
      await adamite()
        .database()
        .collection(match.params.collection)
        .doc(match.params.document)
        .update(e.updated_src, { replace: true });
    } catch (err) {
      Toaster.show({
        icon: "error",
        message: `Unable to save: ${err}`,
        intent: Intent.DANGER
      });
    }
  };

  const deleteDocument = async () => {
    try {
      await adamite()
        .database()
        .collection(match.params.collection)
        .doc(match.params.document)
        .delete();

      history.replace(`/database/collections/${match.params.collection}`);
    } catch (err) {
      Toaster.show({
        icon: "error",
        message: `Unable to delete: ${err}`,
        intent: Intent.DANGER
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/collections/${match.params.collection}/${match.params.document}`
    );
    Toaster.show({ message: "Copied document link to clipboard.", icon: "tick" });
  };

  const copyButton = (
    <Tooltip content="Copy to Clipboard">
      <Button icon="clipboard" onClick={copyToClipboard} minimal />
    </Tooltip>
  );

  const deleteButton = (
    <Popover position={Position.BOTTOM_RIGHT}>
      <Button icon="trash" minimal />
      <Menu>
        <Button text="Delete Document" intent={Intent.DANGER} minimal fill onClick={deleteDocument} />
      </Menu>
    </Popover>
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
          actions={
            <>
              {copyButton}
              {deleteButton}
            </>
          }
        />

        <ReactJson
          src={value.data}
          name={false}
          displayDataTypes={false}
          style={{ fontFamily: '"Overpass Mono", monospace', padding: 15, borderRadius: 5 }}
          theme="ocean"
          onEdit={saveChanges}
          onAdd={saveChanges}
          onDelete={saveChanges}
        />
      </Section>
    </>
  );
}

export default DocumentDataSection;
