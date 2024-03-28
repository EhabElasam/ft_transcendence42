import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Navbar as BootstrapNavbar, Nav, Button } from "react-bootstrap";
import { FiGlobe } from "react-icons/fi";
import ReactFlagsSelect from "react-flags-select";

import "./Navbar.css";

const Navbar = ({ isLoggedIn: initialIsLoggedIn, setLoggedIn }) => {
  const { t, i18n } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn) {
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));
    }
  }, [initialIsLoggedIn]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    setLoggedIn(isLoggedIn);
  }, [isLoggedIn, setLoggedIn]);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BootstrapNavbar expand="md" className="pong-navbar">
      <div className="language-container">
        <ReactFlagsSelect
          countries={["US", "AT", "TR", "BG", "EG", "FR"]}
          customLabels={{
            US: "EN",
            AT: "AT",
            TR: "TR",
            BG: "BG",
            EG: "EG",
            FR: "FR"
          }}
          selected={i18n.language.toUpperCase()}
          onSelect={(countryCode) => changeLanguage(countryCode.toLowerCase())}
          placeholder="ENG"
          defaultCountry="US"
          selectedSize={12}
          optionsSize={12}
          optionStyles={{
            backgroundColor: "#000 !important",
            color: "#fff !important",
          }}
        />
      </div>
      <div>
        <Link to="/" className="navbar-brand mr-auto">
          Pong42
        </Link>
      </div>
      
     
      
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        
        <Nav className="ml-auto">
          {!isLoggedIn && (
            <>
              <Link to="/login" className="nav-link bn">
                <FiGlobe className="mr-2" />
                {t("auth.login")}
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Link to="/game" className="nav-link">
                <FiGlobe className="mr-2" />
                {t("game.title")}
              </Link>
              <Link to="/chat" className="nav-link">
                <FiGlobe className="mr-2" />
                {t("chat.title")}
              </Link>
              <Link to="/leaderboard" className="nav-link">
                <FiGlobe className="mr-2" />
                {t("leaderboard.title")}
              </Link>
              <Link to="/profile" className="nav-link">
                <FiGlobe className="mr-2" />
                {t("auth.profile")}
              </Link>
              <Button
                variant="link"
                className="nav-link-logout"
                onClick={handleLogout}
              >
                {t("auth.logout")}
              </Button>
            </>
          )}
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
