import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import JobAds from "../JobAds";
import "./MyApplications.css";
import {
  getAllApplications,
  getMyApplications,
  clearAds
} from "../../actions/adActions";

import PropTypes from "prop-types";
import MyApplicationsContainer from "./MyApplicationsContainer";
import ModalApplication from "./ModalApplication";

const MyApplications = ({
  getAllApplications,
  ads: { loading, adApplications, myApplications },
  workerApplications,
  getMyApplications,
  match,
  clearAds,
  auth,
  title,
  subtitle
}) => {
  useEffect(() => {
    clearAds();
    if (workerApplications) {
      getMyApplications();
    } else {
      getAllApplications(match.params.id);
    }
  }, [getAllApplications]);

  

  const mapperHelper = workerApplications ? myApplications : adApplications;

  return (
    <Fragment>
      {loading || !mapperHelper || auth.loading ? (
        <Fragment>
          <JobAds />
          <div>Loading Applicants...</div>
        </Fragment>
      ) : (
        <Fragment>
          <JobAds title={title} subtitle={subtitle} />
          {mapperHelper.length > 0 ? (
            mapperHelper.map(applicant => (
              <MyApplicationsContainer applicant={applicant} auth={auth} />
            ))
          ) : (
            <Fragment>
              <JobAds />
              <div>You have no Applicants to this Ad, I'm sorry</div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

MyApplications.propTypes = {};

const mapStateToProps = state => {
  return {
    ads: state.ads,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {
    clearAds,
    getAllApplications,
    getMyApplications
  }
)(MyApplications);
