import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function TopNavbar() {
  return (
    <nav>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand to="/" as={NavLink}>
            Home
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link to="/search" as={NavLink}>
                Search
              </Nav.Link>
              <Nav.Link to="/calculator" as={NavLink}>
                Calculator
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
}

export default TopNavbar;
