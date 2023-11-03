import React from 'react';
import styled from 'styled-components';

const LeaderboardContainer = styled.div`
  width: 300px;
  height: 300px;
  position: absolute;
  top: 0;
  left: 500px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LeaderboardItem = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Leaderboard = ({ scores }) => {
  // Sort the scores in descending order.
  const sortedScores = scores.sort((a, b) => b.score - a.score);

  // Render a list of the top scores.
  return (
    <LeaderboardContainer className="leaderboard-container">
      <h1>Leaderboard</h1>
      {sortedScores.map((score, index) => (
        <LeaderboardItem key={index} title={score.name}>
          {score.name}: {score.score}
        </LeaderboardItem>
      ))}
    </LeaderboardContainer>
  );
};

export default Leaderboard;
