import { connect } from "react-redux";
import PlayerStacks from "../components/gamewindow/stackView/stacks";

const mapStateToProps = ({ playerList }) => ({
  playerList,
});

export default connect(mapStateToProps)(PlayerStacks);
