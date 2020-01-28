import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Spinner = props => {
  const styles = {
    color: "white"
  };
  styles.fontSize = props.fontSize || "45px";

  return (
    <span className="align-self-center" style={styles}>
      <FontAwesomeIcon icon={faSpinner} spin />
    </span>
  );
};

export default Spinner;
