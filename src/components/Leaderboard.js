import React, { useState } from 'react';
import styled from 'styled-components';

const LeaderboardContainer = styled.div`
  width: 10px;
  height: 10px;
  position: absolute;
  top: 0;
  left: 500px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
`;

const LeaderboardItem = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  // Sort the scores in descending order, and limit the number of scores to 10.
  const sortedScores = scores?.sort((a, b) => b.score - a.score).slice(0, 10) || [];

  // Render a list of the top scores.
  return (
    <LeaderboardContainer className="leaderboard-container">
      <h1>Leaderboard</h1>
      <ul>
        {sortedScores.map((score, index) => (
          <LeaderboardItem key={index}>
            <li>
              <b>{score.name}:</b> {score.score}
            </li>
            <li>{index + 1}</li>
          </LeaderboardItem>
        ))}
      </ul>
    </LeaderboardContainer>
  );
};

export default Leaderboard;
