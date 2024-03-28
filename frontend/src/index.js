import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios"; // Import Axios for making HTTP requests
import "./index.css";
import App from "./App";
import i18n from "./i18n";
import reportWebVitals from "./reportWebVitals";

const LanguageInitializer = () => {
  useEffect(() => {

    const wakeUpBackend = async () => {
      try {

        const pingURL = "https://pong42.azurewebsites.net/ping/";
        const response = await axios.get(pingURL);
        console.log(response.data.message);
      } catch (error) {

        console.error("Error waking up server:", error);
      }
    };
    wakeUpBackend();
    const storedLanguage = localStorage.getItem("language");
    i18n.changeLanguage(storedLanguage || "en");
  }, []);

  return null; // The LanguageInitializer component doesn't render anything
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageInitializer />
    <App />
  </React.StrictMode>,
);


reportWebVitals();
