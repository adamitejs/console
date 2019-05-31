import React from "react";
import { Link } from "react-router-dom";
import "./SectionHeading.scss";

function SectionHeading({ title, parentTitle, titleLink, parentTitleLink }) {
  return (
    <div className="section-heading">
      <Link to={titleLink}>
        <h1>{title}</h1>
      </Link>
      <Link to={parentTitleLink}>
        <h2>{parentTitle}</h2>
      </Link>
    </div>
  );
}

export default SectionHeading;
