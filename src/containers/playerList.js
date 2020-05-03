import { connect } from "react-redux";
import PlayerList from "../components/playerwindow/playerwindow";

const mapStateToProps = (state) => ({
  playerList: state.playerList,
  hostID: state.hostID,
  playerID: state.playerID,
});

export default connect(mapStateToProps)(PlayerList);
