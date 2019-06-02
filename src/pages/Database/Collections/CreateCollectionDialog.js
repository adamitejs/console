import React, { useState } from "react";
import { Dialog, Classes, FormGroup, InputGroup, Button, Intent } from "@blueprintjs/core";
import ReactJson from "react-json-view";

function CreateCollectionDialog({ isOpen, onClose, onSubmit }) {
  const [collectionName, setCollectionName] = useState("");
  const [initialDocument, setInitialDocument] = useState({});
  const formValid = collectionName !== "";

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ collectionName, initialDocument });
    onClose();
    setCollectionName("");
    setInitialDocument({});
  };

  return (
    <Dialog title="Add Collection" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className={Classes.DIALOG_HEADER}>
          <p>
            To create a new collection, provide a name for the collection, and the initial document to insert into that
            collection.
          </p>
        </div>

        <div className={Classes.DIALOG_BODY}>
          <FormGroup label="Collection Name" labelInfo="(required)">
            <InputGroup
              value={collectionName}
              onChange={e => setCollectionName(e.target.value)}
              placeholder="users"
              large
              required
            />
          </FormGroup>

          <FormGroup label="Initial Document">
            <ReactJson
              src={initialDocument}
              name={false}
              displayDataTypes={false}
              style={{ fontFamily: '"Overpass Mono", monospace', padding: 15, borderRadius: 5 }}
              theme="ocean"
              onEdit={e => setInitialDocument(e.updated_src)}
              onAdd={e => setInitialDocument(e.updated_src)}
              onDelete={e => setInitialDocument(e.updated_src)}
            />
          </FormGroup>
        </div>

        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button type="submit" intent={Intent.PRIMARY} text="Create" disabled={!formValid} />
          </div>
        </div>
      </form>
    </Dialog>
  );
}

export default CreateCollectionDialog;
