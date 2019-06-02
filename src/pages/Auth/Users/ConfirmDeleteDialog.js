import React from "react";
import { Dialog, Classes, Intent, Button } from "@blueprintjs/core";

function ConfirmDeleteDialog({ email, isOpen, onClose, onSubmit }) {
  return (
    <Dialog icon="trash" title="Delete User" isOpen={isOpen} onClose={onClose}>
      <div className={Classes.DIALOG_BODY}>
        <p>
          Are you sure you want to delete <strong>{email}</strong>? This action can not be reversed.
        </p>
      </div>

      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button text="Cancel" onClick={onClose} />
          <Button intent={Intent.DANGER} text="Delete" onClick={onSubmit} />
        </div>
      </div>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
