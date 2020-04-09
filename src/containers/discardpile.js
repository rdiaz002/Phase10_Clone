import { connect } from "react-redux";
import DiscardPile from "../components/gamewindow/discardpile";

const mapStateToProps = (state) => ({
  discardPile: state.discardPile,
});

export default connect(mapStateToProps)(DiscardPile);
