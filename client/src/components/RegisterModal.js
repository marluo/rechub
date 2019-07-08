import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import "@material/typography/dist/mdc.typography.css";
import { Typography } from "@rmwc/typography";
import Background from "./backgroundx.png";
import { connect } from "react-redux";
import JobAds from "./JobAds";
import { withRouter } from "react-router-dom";
import { login } from "../actions/authAction";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { hideModal } from "../actions/modalActions";

const LoginModal = ({
  showBackdrop,
  showLogin,
  email,
  password,
  onChange,
  setToggleRegister,
  onSubmit,
  hideModal,
  firstName,
  lastName,
  username,
  role
}) => {
  console.log("WWERWERWQEQWE", role);
  return (
    <Fragment>
      <div
        className={`backdrop ${showBackdrop}`}
        onClick={() => {
          hideModal();
          setToggleRegister(false);
        }}
      />
      <div className="modal-container">
        <div className={`modal-login ${showLogin}`}>
          <div className="login-text" />
          <form className="login-form" onSubmit={event => onSubmit(event)}>
            <h2>REGISTER TO RECHUB</h2>
            <div className="role-wrapper">
              <select
                className="role-input"
                name="role"
                onChange={event => onChange(event)}
                value={role}
              >
                <option value="prospect">Prospect</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>
            <div className="email-wrapper">
              <input
                placeholder="Email"
                type="email"
                // name är det som react känner igen och identiferar med
                name="email"
                // value så att det skrivs in
                value={email}
                onChange={event => onChange(event)}
                className="email-input"
                required
              />
            </div>
            <div className="password-wrapper">
              <input
                placeholder="Password"
                type="password"
                // name är det som react känner igen och identiferar med
                name="password"
                // value så att det skrivs in
                value={password}
                onChange={event => onChange(event)}
                className="password-input"
                required
              />
            </div>
            <div className="username-wrapper">
              <input
                placeholder="Username"
                type="text"
                // name är det som react känner igen och identiferar med
                name="username"
                // value så att det skrivs in
                value={username}
                onChange={event => onChange(event)}
                className="password-input"
                required
              />
            </div>
            <div className="firstname-wrapper">
              <input
                placeholder="First Name"
                type="text"
                // name är det som react känner igen och identiferar med
                name="firstName"
                // value så att det skrivs in
                value={firstName}
                onChange={event => onChange(event)}
                className="password-input"
                required
              />
            </div>
            <div className="lastname-wrapper">
              <input
                placeholder="Last Name"
                type="text"
                // name är det som react känner igen och identiferar med
                name="lastName"
                // value så att det skrivs in
                value={lastName}
                onChange={event => onChange(event)}
                className="password-input"
                required
              />
            </div>
            <input type="submit" className="login-button" value="Register" />
            <div onClick={() => setToggleRegister(false)} className="signup">
              <p>Already Registered? Login</p>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

LoginModal.propTypes = {};

export default LoginModal;
