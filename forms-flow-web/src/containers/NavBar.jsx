import React, { Component, Fragment } from "react";
import { Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { selectRoot } from "react-formio";
import { push } from "connected-react-router";

import UserService from "../services/UserService";
import { setUserAuth } from "../actions/bpmActions";
import { STAFF_REVIEWER, STAFF_DESIGNER } from "../constants/constants";

class NavBar extends Component {
  getUserRole = (userRoles) => {
    let role = "";
    if (userRoles.includes(STAFF_REVIEWER)) {
      role = "REVIEWER";
    } else if (userRoles.includes(STAFF_DESIGNER)) {
      role = "DESIGNER";
    } else {
      role = "CLIENT";
    }
    return role;
  };

  render() {
    const { user, userRoles, isAuthenticated } = this.props;

    return (
      <header>
        <Navbar expand="lg">
          <section className="container-fluid">
            <Navbar.Brand className="d-flex">
              <Link to="/">
                <img
                  className="img-fluid d-none d-md-block"
                  src="/logo.svg"
                  width="177"
                  height="44"
                  alt="Logo"
                />
                <img
                  className="img-fluid d-md-none"
                  src="/simple-logo.svg"
                  width="63"
                  height="44"
                  alt="Logo"
                />
              </Link>
              <Link to="/">
                <div className="div-center">
                  <label className="lbl-app-nanme">FormsFlow</label>
                  <label className="lbl-app-nanme app-name">.AI</label>
                </div>
              </Link>
              {/* for small screen */}
              <Nav className="d-md-none custom-profile">
                <NavDropdown
                  style={{ fontSize: "18px" }}
                  title={
                    <div className="pull-left">
                      <img
                        className="thumbnail-image"
                        src="/assets/Images/user.svg"
                        alt="user pic"
                      />
                    </div>
                  }
                  className="nav-dropdown"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Header className="nav-user-name">
                    {user.name || user.preferred_username}
                  </NavDropdown.Header>
                  <NavDropdown.Header
                    className="nav-user-email"
                    title={user.email}
                  >
                    {user.email}
                  </NavDropdown.Header>
                  <NavDropdown.Header className="nav-user-role">
                    {this.getUserRole(userRoles)}
                  </NavDropdown.Header>
                  <NavDropdown.Divider />
                  <NavDropdown.Header
                    className="nav-logout"
                    onClick={UserService.userLogout}
                  >
                    <img src="/assets/Images/logout.svg" alt="" />
                    <label className="lbl-logout">Logout</label>
                  </NavDropdown.Header>
                </NavDropdown>
              </Nav>
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="navbar-dark custom-toggler"
            />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="navbar-nav"
            ></Navbar.Collapse>
            <Nav className="d-none d-md-block">
              {isAuthenticated ? (
                <Fragment>
                  <i
                    className="fa fa-sign-out text-white fa-lg"
                    aria-hidden="true"
                  />
                  <Button
                    variant="link"
                    style={{
                      color: "white",
                      fontSize: "20px",
                      textDecoration: "none",
                    }}
                    onClick={UserService.userLogout}
                  >
                    Logout
                  </Button>
                </Fragment>
              ) : (
                <Fragment>
                  <i className="fa fa-sign-in text-white" aria-hidden="true" />
                  <Button
                    variant="link"
                    style={{
                      color: "white",
                      fontSize: "20px",
                      textDecoration: "none",
                    }}
                    onClick={() => this.props.login()}
                  >
                    Login
                  </Button>
                </Fragment>
              )}
            </Nav>
          </section>
        </Navbar>
      </header>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    userRoles: selectRoot("user", state).roles || [],
    user: selectRoot("user", state).userDetail || [],
    isAuthenticated: state.user.isAuthenticated,
    activePage: selectRoot("user", state).currentPage || "",
    pathname: state.router.location.pathname,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => {
      dispatch(push(`/`));
    },
    setUserAuth: (value) => {
      dispatch(setUserAuth(value));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(NavBar);
