import {connect} from 'react-redux'
import dashboard from '../components/dashboard/dashboard'

const mapStateToProps=(state)=>({
    playerName: state.playerName,
    playerID: state.playerID
})


export default connect(mapStateToProps)(dashboard)