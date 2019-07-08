import React from "react";
import PropTypes from "prop-types";
import MyApplicationsCard from "./MyApplicationsCard";

const MyApplicationsContainer = ({
  applicant,
  auth: {
    user: { role }
  }
}) => {
  return (
    <div className="applicant-container">
      <MyApplicationsCard applicant={applicant} role={role} />
    </div>
  );
};

MyApplicationsContainer.propTypes = {};

export default MyApplicationsContainer;
