
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Footer.css";
import Contact from "./Contact";
import PrivacyPolicy from "./PrivacyPolicy";
const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer-container">
      <div className="footer-links">
        <Link to="/privacy-policy" className="footer-link">
          {t("footer.privacyPolicy")}
        </Link>
        <Link to="/contact" className="footer-link">
          {t("footer.impressum")}
        </Link>
      </div>

      <div
        className="footer-text"
        style={{ textAlign: "right", paddingRight: "30px" }}
      >
        {t("footer.madeWith")} <AiFillHeart className="heart-icon" />{" "}
        {t("footer.at42Vienna")}
      </div>
    </footer>
  );
};

export default Footer;
