import React from "react";

const Like = ({ liked, onClick }) => {
  let classes = "fa fa-heart";
  classes += liked === undefined ? "-o" : liked === false ? "-o" : "";
  return (
    <i
      onClick={onClick}
      className={classes}
      style={{ cursor: "grab" }}
      aria-hidden="true"
    />
  );
};

export default Like;
