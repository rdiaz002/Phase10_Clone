import { connect } from "react-redux";
import CardView from "../components/gamewindow/cardview";

const mapStateToProps = (state) => ({
  playerHand: state.playerHand,
  playerState: state.playerState,
  currentPlayer: state.currentPlayer,
});

export default connect(mapStateToProps)(CardView);
