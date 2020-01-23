import React from 'react';
import matches from '../data/polling.json';
import PollItem from './PollItem'

export const getRandomMatch = () => {
  const activeMatches = matches.filter(match => match.state !== 'FINISHED')
  return activeMatches[Math.floor(Math.random() * activeMatches.length)]
}

function Poll() {
  const randomMatch = getRandomMatch();
  return (
    <div className="poll">
      <PollItem match={randomMatch} />
    </div>
  );
}

export default Poll;
