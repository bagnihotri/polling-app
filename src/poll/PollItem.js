import React, {useState, useEffect} from 'react';
import PollProgress from "./PollProgress"
import "./Style.css";
import {sportLogo, matchState} from "./helper";

function PollItem(props) {
  const { match } = props;
  const [pollingData, setPollingData] = useState({})
  const [totalVotes, setTotalVotes] = useState(0);
  const [voteCasted, setVoteCasted] = useState(false);
  const [votedFor, setVotedFor] = useState(null);

  useEffect(() => {
    const storedPollingData = localStorage.getItem(match.id);
    setPollingData(storedPollingData ? JSON.parse(storedPollingData) : {
      [match.awayName]:0,
      [match.homeName]:0,
      draw:0})
  }, [match.id, match.awayName, match.homeName]);

  useEffect(() => {
    localStorage.setItem(match.id,JSON.stringify(pollingData));
  }, [pollingData, match.id]);

  useEffect(() => {
    const votes = Object.values(pollingData).reduce((val, acc) => val + acc, 0);
    setTotalVotes(votes);
    
  }, [pollingData]);
  
  const pollResults = (name) => () =>{
    setVoteCasted(true);
    setVotedFor(name);
    setPollingData({...pollingData, [name]: pollingData[name]+ 1});
  };

  const { awayName, homeName, country, sport, state} = match;
  return (
    <section className="container">
      <section className="match-detail">
        <img src={sportLogo[sport]} className="sport-logo" alt={sport}/>
        <div>
          <h2>{awayName} vs {homeName}</h2>
          <span className="secondary-info">{matchState[state]}</span>
          <i className={`country ${country.toLowerCase()}`} />
        </div>
      </section>
      <h3>Who will win?</h3>
      <div className="poll-items">
        <PollProgress pollResults={pollResults} name={awayName} votes={pollingData[awayName] ? pollingData[awayName]/totalVotes : 0} voteCasted={voteCasted} voted={votedFor === awayName}/>
        <PollProgress pollResults={pollResults} name={homeName} votes={pollingData[homeName] ? pollingData[homeName]/totalVotes : 0} voteCasted={voteCasted} voted={votedFor === homeName}/>
        <PollProgress pollResults={pollResults} name="draw" votes={pollingData.draw ? pollingData.draw/totalVotes: 0} voteCasted={voteCasted} voted={votedFor === "draw"}/>
      </div>
      <span className="secondary-info">Votes: {totalVotes}</span>
    </section>
  );
}

export default PollItem;
