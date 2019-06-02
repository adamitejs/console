import React, { useState } from "react";
import { Dialog, Classes, FormGroup, InputGroup, Button, Intent } from "@blueprintjs/core";

function ChangeEmailDialog({ isOpen, onClose, onSubmit }) {
  const [email, setEmail] = useState("");
  const formValid = email !== "";

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ email });
    onClose();
    setEmail("");
  };

  return (
    <Dialog title="Change Email" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className={Classes.DIALOG_BODY}>
          <FormGroup label="New Email" labelInfo="(required)">
            <InputGroup
              type="email"
              placeholder="john@hydrais.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              large
              required
            />
          </FormGroup>
        </div>

        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button type="submit" intent={Intent.PRIMARY} text="Save" disabled={!formValid} />
          </div>
        </div>
      </form>
    </Dialog>
  );
}

export default ChangeEmailDialog;
