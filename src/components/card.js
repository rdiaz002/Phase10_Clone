import React from "react";

const Card = (props) => {
  const getColor = () => {
    switch (props.card.type) {
      case "Red":
        return "#ff0000";
      case "Green":
        return "#00ff00";
      case "Blue":
        return "#0000ff";
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
    maxWidth: "fit-content",
    minWidth: "7.5vw",
    height: "10vw",
    fontSize: "1.5vw",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    margin: "10px",
    padding: "10px",
    flex: "1",
    borderRadius: "5px",
    border:"3px solid black"
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
