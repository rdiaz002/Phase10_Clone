import React, { useEffect } from "react";
import { setupChat, sendMsg } from "../../api";
import { updateChat } from "../../actions";
import { store } from "../../store";
const Chat = ({ dispatch, chatLog }) => {
  var currentMsg = "";

  const update = (msg) => {
    dispatch(updateChat(msg));
    document.getElementById("dummy").scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setupChat((msg) => {
      update(msg);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    sendMsg(store.getState().playerName + ": " + currentMsg);
    document.getElementById("chatbar").value = "";
  };

  const onChange = (e) => {
    currentMsg = e.target.value;
  };
  return (
    <div className="Chat">
      <div className="ChatWindow" id="chatwindowdiv">
        {chatLog.map((value) => {
          return <h2>{value}</h2>;
        })}
        <div id="dummy"></div>
      </div>
      <form onSubmit={onSubmit}>
        <label>
          Message:
          <input
            id="chatbar"
            type="text"
            placeholder="Type here"
            onChange={onChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
export default Chat;
