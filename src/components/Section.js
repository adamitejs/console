import React from "react";
import classNames from "classnames";
import "./Section.scss";

function Section({ children, className, darkened }) {
  return <section className={classNames("section", className, { darkened })}>{children}</section>;
}

export default Section;
