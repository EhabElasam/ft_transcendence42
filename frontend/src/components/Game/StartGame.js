import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  IoGameControllerOutline,
  IoGameControllerSharp,
  IoGameController,
} from "react-icons/io5";
import "./StartGame.css"; // Import CSS file for custom styling if needed

const StartGame = () => {
  const [selectedGame, setSelectedGame] = useState("");

  const handleGameSelection = (gameType) => {
    setSelectedGame(gameType);
  };

  return (
    <div className="container mt-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="mb-4">Select a Game:</h1>
          <ul className="list-group list-group-flush">
            
            <li className="list-group-item">
              <Link to="/pongehab">
                <button
                  className="btn btn-primary btn-lg w-100 d-flex justify-content-between align-items-center bn"
                  onClick={() => handleGameSelection("PongGame")}
                >
                  <span>Standard Game (2 Players locally) version ehab</span>
                </button>
              </Link>
            </li><br/>
            <li className="list-group-item">
              <Link to="/ponggame">
                <button
                  className="btn btn-primary btn-lg w-100 d-flex justify-content-between align-items-center bn"
                  onClick={() => handleGameSelection("PongGame")}
                >
                  <span>Standard Game (2 Players locally)</span>
                </button>
              </Link>
            </li><br/>
            <li className="list-group-item">
            <Link to="/player3d1">
              <button
                className="btn btn-primary btn-lg w-100 d-flex justify-content-between align-items-center bn"
                onClick={() => handleGameSelection("Player3D1")}
              >
                <span>1 Player 3D</span>
                <IoGameControllerSharp />
              </button>
              </Link>
            </li><br/>
            <li className="list-group-item">
            <Link to="/playerai1">
              <button
                className="btn btn-primary btn-lg w-100 d-flex justify-content-between align-items-center bn"
                onClick={() => handleGameSelection("PlayerAi1")}
              >
                <span>1 Player with AI</span>
                <IoGameControllerSharp />
              </button>
              </Link>
            </li><br/>
            <li className="list-group-item">
            <Link to="/playersremote2">
              <button
                className="btn btn-primary btn-lg w-100 d-flex justify-content-between align-items-center bn"
                onClick={() => handleGameSelection("PlayersRemote2")}
              >
                <span>2 Players Remotely</span>
                <IoGameController />
              </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StartGame;
