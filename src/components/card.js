import React from "react";

const Card = (props) => {
  const getColor = () => {
    switch (props.card.type) {
      case "Red":
        return "#ff0000";
      case "Green":
        return "#00ff00";
      case "Blue":
        return "#3672F2";
      case "Yellow":
        return "#ffff00";
      case "Wild":
        return "#ffffff";
      case "Skip":
        return "#ffffff";
    }
  };

  const cardStyle = {
    backgroundColor: getColor(),
  };

  return (
    <div
      className="Card"
      style={cardStyle}
      key={props.index}
      id={props.index}
      onClick={props.click}
    >
      <h2>{props.card.type}</h2>
      <h1>{props.card.number}</h1>
    </div>
  );
};

export default Card;
