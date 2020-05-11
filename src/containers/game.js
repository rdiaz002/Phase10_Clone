import { connect } from "react-redux";
import Game from "../components/gamewindow/game";

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(Game);
