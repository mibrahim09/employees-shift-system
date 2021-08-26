import React from 'react'
import { Link, BrowserRouter } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

import { CustomNavLink, CustomNavDropDownLink } from './customNavLink'

const MyNavBar = (props) => {
  const user = props.user
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">Employees</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <CustomNavLink to="/">Shifts Table</CustomNavLink>
            <CustomNavLink to="/employees/new">New Employee</CustomNavLink>
            <CustomNavLink to="/employees/">New Shift</CustomNavLink>
            <CustomNavLink to="/team">Team</CustomNavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNavBar
