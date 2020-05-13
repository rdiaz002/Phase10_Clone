import React from "react";
import * as utils from "../../utils";
const PhaseCard = () => {
  const phases = utils.getPhases();
  const playerPhase = utils.getCurrentPhase();

  return (
    <div className="PhaseCard">
      <h4>List of Phases</h4>
      {phases.map((phase, index) => {
        return (
          <h4>
            {playerPhase == index ? ">" : ""}
            {index + 1}.{" "}
            {phase.patterns.map((pattern, ind) => {
              return (
                <span>
                  {pattern.desc} {pattern.size}
                  {ind + 1 < phase.patterns.length ? "," : ""}
                </span>
              );
            })}
          </h4>
        );
      })}
    </div>
  );
};

export default PhaseCard;
