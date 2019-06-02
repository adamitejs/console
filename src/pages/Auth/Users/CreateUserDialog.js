import React, { useState } from "react";
import { Dialog, Classes, FormGroup, InputGroup, Button, Intent } from "@blueprintjs/core";
import ReactJson from "react-json-view";

function CreateUserDialog({ isOpen, onClose, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formValid = email !== "" && password !== "";

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ email, password });
    onClose();
    setEmail("");
    setPassword("");
  };

  return (
    <Dialog title="Add User" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className={Classes.DIALOG_HEADER}>
          <p>To create a new collection, specify an email address and password.</p>
        </div>

        <div className={Classes.DIALOG_BODY}>
          <FormGroup label="Email" labelInfo="(required)">
            <InputGroup
              type="email"
              placeholder="john@hydrais.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              large
              required
            />
          </FormGroup>

          <FormGroup label="Password" labelInfo="(required)">
            <InputGroup
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              large
              required
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

export default CreateUserDialog;
