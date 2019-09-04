import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const toggler = () => setIsOpen(!isOpen)

  return (
    <Navbar color="dark" light expand="md">
      <NavbarBrand tag={Link} to='/'><span role='img' aria-label='movie camera'>&#x1F3A5;</span> Minhas Séries</NavbarBrand>
      <NavbarToggler onClick={toggler} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to='/series'>Séries</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to='/generos'>Gêneros</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default Header