import * as React from "react";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { Link, navigate } from "gatsby";
import { getUser, isLoggedIn, logout } from "../services/auth"


const HeaderStyled = styled.header`
  // ********************************** Company Name
  p {
    margin: 0;
    padding: 0;
    color: var(--text-black);
    font-size: 1.25rem;
  }
`;

const Navbar = {
  Wrapper: styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    box-shadow: 0 1px 1px rgba(47, 47, 47, 10%);
    flex: 1;
    align-self: flex-start;
    /* padding: 1rem 3rem; */
    padding: 1rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 5;

    /* background-color: white; */
    /* lesson: ternary works but only on manual refresh since its not updating a state */
    /* background: ${isLoggedIn() ? "pink" : "transparent"}; */
    width: 100vw;
    // 40em == 640px
    @media only screen and (max-width: 40em) {
      position: fixed;
      // bottom: 0;
    }
  `,
  Logo: styled.h1`
    border: 1px solid gray;
    padding: 0.5rem 1rem;
    margin-block-end: 0;
  `,
  Items: styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    align-self: end;

    @media only screen and (max-width: 40em) {
      position: fixed;
      right: 0;
      top: 0;
      background-color: hsl(2,50%,85%);
      box-shadow: 0 1px 1px rgba(47, 47, 47, 10%);
      height: 100%;
      flex-direction: column;
      padding: 1rem 2rem;
      transition: 0.2s ease-out;
      transform: ${({ openDrawer }) =>
      openDrawer ? `translateX(0)` : `translateX(100%)`};
    }
  `,
  Item: styled.li`
    padding: 0 1rem;
    cursor: pointer;
    @media only screen and (max-width: 40em) {
      padding: 1rem 0;
    }
  `,
};

const HamburgerButton = {
  Wrapper: styled.button`
    height: 3rem;
    width: 3rem;
    position: relative;
    font-size: 12px;

    display: none;

    @media only screen and (max-width: 40em) {
      display: block;
    }

    /* Remove default button styles */
    border: none;
    background: transparent;
    outline: none;

    cursor: pointer;

    &:after {
      content: "";
      display: block;
      position: absolute;
      height: 150%;
      width: 150%;
      top: -25%;
      left: -25%;
    }
  `,
  Lines: styled.div`
    top: 50%;
    margin-top: -0.125em;

    &,
    &:after,
    &:before {
      /* Create lines */
      height: 2px;
      pointer-events: none;
      display: block;
      content: "";
      width: 100%;
      background-color: black;
      position: absolute;
    }

    &:after {
      /* Move bottom line below center line */
      top: -0.8rem;
    }

    &:before {
      /* Move top line on top of center line */
      top: 0.8rem;
    }
  `,
};

const Nav = () => {
  // ******** gatsby auth test
  let greetingMessage = ""
  if (isLoggedIn()) {
    greetingMessage = `Hello ${getUser().name}`
  } else {
    greetingMessage = "You are not logged in"
  }

  // ******** end gatsby auth test


  const [openDrawer, toggleDrawer] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    // Close the drawer when the user clicks outside of it
    const closeDrawer = (event) => {
      if (drawerRef.current && drawerRef.current.contains(event.target)) {
        return;
      }
      toggleDrawer(console.log("wwwwwEEEEEEEEEEEEEEEEEEEEEEEEEEE"));
    };

    document.addEventListener("mousedown", closeDrawer);
    return () => document.removeEventListener("mousedown", closeDrawer);
  }, []);


  return (
    // lesson: changing bg upon logged on status. works like this, OR pass in same function no Nav component as a prop and do prop.isLoggedIn ? "pink"
    // : "red"... It seems that you can use props in styled components but I couldn't get it to work :shrug
    <Navbar.Wrapper style={{ backgroundColor: isLoggedIn() ? "#DDF3DA" : "white" }}>
      <Navbar.Logo>Logo</Navbar.Logo>
      {/* <span>{greetingMessage}</span> */}

      <HamburgerButton.Wrapper onClick={() => toggleDrawer(true)}>
        <HamburgerButton.Lines />
      </HamburgerButton.Wrapper>

      <Navbar.Items ref={drawerRef} openDrawer={openDrawer}>
        <Navbar.Item>
          <Link to="/">Home</Link>
        </Navbar.Item>
        {isLoggedIn() ?
          <Navbar.Item>
            <Link to="/app/SettingsComponent">Settings</Link>
          </Navbar.Item>
          : null}
        <Navbar.Item>
          {isLoggedIn() ? (
            <a
              href="/"
              onClick={event => {
                event.preventDefault()
                logout(() => navigate(`/app/login`))
              }}
            >
              Logout
            </a>
          ) : <Link to="/app/login">Maint. Log In</Link>}
        </Navbar.Item>
        {/* <Navbar.Item>
          <Link to="/admin">Maintenance</Link>
        </Navbar.Item> */}
      </Navbar.Items>
    </Navbar.Wrapper>
  );
};

export default Nav;
