import React, { useState } from "react";
import {
  Button,
  Intent,
  Popover,
  Menu,
  FormGroup,
  HTMLTable,
  MenuItem,
  MenuDivider,
  Position,
  Switch
} from "@blueprintjs/core";
import Section from "../../../components/Section";
import SectionHeading from "../../../components/Headings/SectionHeading";
import useUserData from "../../../hooks/useUserData";
import dayjs from "dayjs";
import ChangeEmailDialog from "./ChangeEmailDialog";
import "./UserDataSection.scss";
import ChangePasswordDialog from "./ChangePasswordDialog";
import adamite, { AuthAdmin } from "@adamite/sdk";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

function UserDataSection({ match, history, onRefresh }) {
  const [changeEmailOpen, setChangeEmailOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const { user, loading, refresh } = useUserData(match.params.user);

  const changeEmail = async ({ email }) => {
    const admin = new AuthAdmin(adamite());
    await admin.setUserEmail(user.id, email);
    refresh();
    onRefresh();
  };

  const changePassword = async ({ password }) => {
    const admin = new AuthAdmin(adamite());
    await admin.setUserPassword(user.id, password);
    refresh();
    onRefresh();
  };

  const deleteUser = async () => {
    const admin = new AuthAdmin(adamite());
    await admin.deleteUser(user.id);
    history.replace("/auth/users");
    onRefresh();
  };

  const changeUserDisabled = async e => {
    const admin = new AuthAdmin(adamite());

    if (e.target.checked) {
      await admin.setUserDisabled(user.id, false);
      refresh();
    } else {
      await admin.setUserDisabled(user.id, true);
      refresh();
    }
  };

  const userMenu = (
    <Popover position={Position.TOP_RIGHT}>
      <Button icon="more" minimal />
      <Menu>
        <MenuItem text="Impersonate" />
        <MenuDivider />
        <MenuItem text="Change Email" onClick={() => setChangeEmailOpen(true)} />
        <MenuItem text="Change Password" onClick={() => setChangePasswordOpen(true)} />
        <MenuDivider />
        <MenuItem icon="trash" text="Delete User" intent={Intent.DANGER} onClick={() => setConfirmDeleteOpen(true)} />
      </Menu>
    </Popover>
  );

  if (loading) {
    return (
      <>
        <Section className="user-data">
          <SectionHeading
            title={match.params.user}
            parentTitle="Users"
            titleLink={`/auth/users/${match.params.user}`}
            parentTitleLink={`/auth/users`}
          />
        </Section>
      </>
    );
  }

  return (
    <>
      <ChangeEmailDialog isOpen={changeEmailOpen} onClose={() => setChangeEmailOpen(false)} onSubmit={changeEmail} />

      <ChangePasswordDialog
        isOpen={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
        onSubmit={changePassword}
      />

      <ConfirmDeleteDialog
        email={user.email}
        isOpen={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onSubmit={deleteUser}
      />

      <Section className="user-data">
        <SectionHeading
          title={user.email}
          parentTitle="Users"
          titleLink={`/auth/users/${match.params.user}`}
          parentTitleLink={`/auth/users`}
          actions={userMenu}
        />

        <FormGroup label="User ID">
          <pre>
            <code>{user.id}</code>
          </pre>
        </FormGroup>

        <HTMLTable>
          <tbody>
            <tr>
              <td className="header">Active</td>
              <td>
                <Switch checked={!user.disabled} onChange={changeUserDisabled} />
              </td>
            </tr>

            <tr>
              <td className="header">Email</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
            </tr>

            <tr>
              <td className="header">Created</td>
              <td>{dayjs.unix(user.createdAt / 1000).format("MMMM D, YYYY [at] h:m A")}</td>
            </tr>

            <tr>
              <td className="header">Last Login</td>
              <td>{dayjs.unix(user.lastLoginAt / 1000).format("MMMM D, YYYY [at] h:mm A")}</td>
            </tr>

            <tr>
              <td className="header">Login IP</td>
              <td>{user.lastLoginIP}</td>
            </tr>

            <tr>
              <td className="header">Login Count</td>
              <td>{user.loginCount}</td>
            </tr>
          </tbody>
        </HTMLTable>
      </Section>
    </>
  );
}

export default UserDataSection;
