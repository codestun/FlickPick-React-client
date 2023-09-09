import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { MoviesFilter } from "../movies-filter/movies-filter";

export const NavigationBar = ({ onLoggedOut }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  return (
    <Navbar bg="navbar navbar-dark bg-black" expand="lg">
      <Container>
        <Navbar.Brand className="navbar-brand text-danger" style={{ fontSize: "38px" }} as={Link} to="/">
          FlickPick
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Movies
                </Nav.Link>
                <Nav.Link as={Link} to={`/users/${user.Name}`}>
                  Profile
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    localStorage.clear();
                    onLoggedOut();
                    dispatch(setUser(null));
                  }}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
          {/* Conditionally render the MoviesFilter based on the current route */}
          {location.pathname === "/" && user && <MoviesFilter />}
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
};
