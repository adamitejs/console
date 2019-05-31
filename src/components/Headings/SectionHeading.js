import React from "react";
import { Link } from "react-router-dom";
import "./SectionHeading.scss";

function SectionHeading({ title, parentTitle, parentTitleLink, actions }) {
  return (
    <div className="section-heading">
      <div className="title">
        <h1>{title}</h1>

        <Link to={parentTitleLink}>
          <h2>{parentTitle}</h2>
        </Link>
      </div>

      <div className="actions">{actions}</div>
    </div>
  );
}

export default SectionHeading;
