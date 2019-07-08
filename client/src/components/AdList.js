import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import JobAds from "./JobAds";
import Navbare from "./Navbare";
import PropTypes from "prop-types";
import twitter from "./twitter.png";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import "./AdList.css";
import { getPublicAds } from "../actions/adActions";

const AdList = ({ getPublicAds, posts: { ads, loading } }) => {
  useEffect(() => {
    getPublicAds();
  }, [getPublicAds]);
  return (
    <Fragment>
      <JobAds title="qweqweAAAAAAAA" />
      <div className="full-container">
        <SearchBar />
        <div class="jobs-container">
          {!loading &&
            ads &&
            ads.map(ad => (
              <div class="single-ad-container">
                <Link className="link" to={`/ad/${ad._id}`}>
                  <div class="single-ad">
                    <div class="job-title">{ad.title}</div>
                    <div className="job-desc">
                      <p>{ad.position}</p>
                      <div className="logo">
                        <a>
                          <img src={twitter} />
                        </a>
                      </div>
                    </div>
                    <div class="job-info">
                      <p>asdasd</p>
                      <p>asdasd</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

AdList.propTypes = {};

const mapStateToProps = state => {
  return { posts: state.ads };
};

export default connect(
  mapStateToProps,
  {
    getPublicAds
  }
)(AdList);
