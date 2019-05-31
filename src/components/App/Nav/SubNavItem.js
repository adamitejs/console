import React from "react";
import classNames from "classnames";
import { Button } from "@blueprintjs/core";
import "./SubNavItem.scss";

function SubNavItem({ icon, label, monospace, onClick }) {
  return (
    <Button
      className={classNames("sub-nav-item", { monospace })}
      large
      icon={icon}
      text={label}
      onClick={onClick}
      minimal
      fill
    />
  );
}

export default SubNavItem;
