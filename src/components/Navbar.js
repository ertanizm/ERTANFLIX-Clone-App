import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  padding: 0 60px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  background: ${props => props.show ? '#111' : 'transparent'};
  transition: all 0.5s ease;
  z-index: 100;
  padding-bottom: 15px;
`;

const Logo = styled.h1`
  color: #E50914;
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Arial Black', sans-serif;
  letter-spacing: -1.5px;
  margin: 0;
  
  &:hover {
    color: #f40612;
  }
`;

const NavItems = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin: 0;
`;

const NavItem = styled(Link)`
  color: #e5e5e5;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
  cursor: pointer;
  padding: 5px 0;

  &:hover {
    color: #b3b3b3;
  }
`;

const StyledLogo = styled(Link)`
  text-decoration: none;
`;

const Navbar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Nav show={show}>
      <StyledLogo to="/">
        <Logo>ERTANFLIX</Logo>
      </StyledLogo>
      <NavItems>
        <NavItem to="/">Ana Sayfa</NavItem>
        <NavItem to="/diziler">Diziler</NavItem>
        <NavItem to="/filmler">Filmler</NavItem>
        <NavItem to="/yeni">Yeni ve Popüler</NavItem>
        <NavItem to="/listem">Listem</NavItem>
      </NavItems>
    </Nav>
  );
};

export default Navbar; 