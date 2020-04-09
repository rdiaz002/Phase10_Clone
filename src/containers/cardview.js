import {connect} from 'react-redux'
import CardView from '../components/gamewindow/cardview'

const mapStateToProps=(state)=>({
    playerHand:state.playerHand
})

export default connect(mapStateToProps)(CardView)