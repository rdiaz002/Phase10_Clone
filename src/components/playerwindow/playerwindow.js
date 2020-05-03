import React from "react";
const PlayerList = ({ playerList, hostID }) => {
  const isHost = (player) => {
    return hostID == player.id;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Players</th>
          </tr>
        </thead>
        <tbody>
          {playerList.map((player) => {
            return (
              <tr key={player.id}>
                <td>
                  {player.name === "" ? player.id : player.name}
                  {isHost(player) ? (
                    <strong> Host</strong>
                  ) : (
                    <strong> {player.STATE}</strong>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerList;
