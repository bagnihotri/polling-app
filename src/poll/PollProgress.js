import React from "react";
import "./PollProgress.css";
function PollProgress({pollResults, name, voteCasted, votes, voted}) {
  return (
    <section className="poll-progress-container">
      <div className="poll-details">
        <h4 >{name}</h4>
        {!voteCasted && <i title={name} className="cast-poll" onClick={pollResults(name)} />}
        {voted && <i data-testid="poll-selected" className="poll-selected" />}
        {voteCasted && <span className="percent-info">{(votes * 100).toFixed(2)}%</span>}
        
      </div>
      {voteCasted && <progress max="100" value={votes * 100}></progress>}
    </section>
  )
}

export default PollProgress;