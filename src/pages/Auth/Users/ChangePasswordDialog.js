import React, { useState } from "react";
import { Dialog, Classes, FormGroup, InputGroup, Button, Intent } from "@blueprintjs/core";

function ChangePasswordDialog({ isOpen, onClose, onSubmit }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const formValid = password !== "" && confirmPassword !== "" && password === confirmPassword;

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ password });
    onClose();
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Dialog title="Change Password" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className={Classes.DIALOG_BODY}>
          <FormGroup label="New Password" labelInfo="(required)">
            <InputGroup
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              large
              required
            />
          </FormGroup>

          <FormGroup label="Confirm Password" labelInfo="(required)">
            <InputGroup
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
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

export default ChangePasswordDialog;
