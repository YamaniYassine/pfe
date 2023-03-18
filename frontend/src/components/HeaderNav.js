import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function HeaderNav({ isSignedIn }) {
  console.log(isSignedIn, 'test');
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        {/* <Navbar.Brand>
          <Link to="/">
            <img
              alt="Logo"
              src=""
              width="30"
              height="30" 
              className="d-inline-block align-top"
            />
            
          </Link>
        </Navbar.Brand> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/">Test Page</Nav.Link>
          </Nav>
          <Nav>
            {isSignedIn ? (
              <Nav.Link href="#connected">Connected</Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/signIn">Sign In</Nav.Link>
                <Nav.Link as={Link} to="/signUp">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderNav;
