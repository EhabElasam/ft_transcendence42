import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Leaderboard.css"; // Import the CSS file

const Leaderboard = () => {
  const { t } = useTranslation();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [tournamentResults, setTournamentResults] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch("https://pong42.azurewebsites.net/leaderboard/");
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    const fetchTournamentResults = async () => {
      try {
        const response = await fetch("https://pong42.azurewebsites.net/tournaments/");
        if (!response.ok) {
          throw new Error("Failed to fetch tournament results");
        }
        const data = await response.json();
        setTournamentResults(data);
      } catch (error) {
        console.error("Error fetching tournament results:", error);
      }
    };

    fetchLeaderboardData();
    fetchTournamentResults();
  }, []);
  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };
  const calculateDaysSinceJoining = (joinDate) => {
    const today = new Date();
    const joinedDate = new Date(joinDate);
    const diffTime = Math.abs(today - joinedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="l-wrapper">
      <h1>{t("leaderboard.title")}</h1><br/>
      <table className="c-table">
        <thead>
          <tr>
            <th>{t("leaderboard.rank")}</th>
            <th>{t("leaderboard.player")}</th>
            <th>{t("leaderboard.kudos")}</th>
            <th>{t("leaderboard.membersince")}</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((member, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <div className="c-media">
                  <div
                    className="c-avatar c-media__img "
                    style={{ backgroundColor: getRandomColor() }}
                  >
                    {member.image_link ? (
                      <img style={{ width: '55px', height: '55px', maxWidth: '55px', maxHeight: '55px' }}  src={member.image_link} alt={member.username} />
                    ) : (
                      <div className="default-profile-pic"></div>
                    )}
                  </div>
                  <div className="c-media__content">
                    <div className="c-media__title">{member.username}</div>
                  </div>
                </div>
              </td>
              <td>{member.score || 0}</td>{" "}
              {/* Display 0 if score is empty or 0 */}
              <td>{calculateDaysSinceJoining(member.date_joined)} {t("leaderboard.days")}</td>{" "}
              {/* Display days since joining */}
              <td>
                <button className="button bn">
                  <span className="bi bi-person"></span> {/* User icon */}
                </button>
              </td>
              <td>
                <button className="button bn">
                  <span className="bi bi-play-fill"></span> {/* Play icon */}
                </button>
              </td>
              <td>
                <button className="button bn">
                  <span className="bi bi-person-plus-fill"></span> {/* Add friend icon */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <h1>{t("leaderboard.tournamentResultsTitle")}</h1>
      <div className="tournament-results">
        {tournamentResults.map((tournament, index) => (
          <div key={index} className="tournament">
            <h3>{tournament.name}</h3>
            <table className="c-table">
              <thead>
                <tr>
                  <th>{t("leaderboard.player")}</th>
                  <th>{t("leaderboard.kudos")}</th>
                </tr>
              </thead>
              <tbody>
                {tournament.results.map((result, resultIndex) => (
                  <tr key={resultIndex}>
                    <td>{result.username}</td>
                    <td>{result.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
