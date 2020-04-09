import {connect} from 'react-redux'
import Chat from '../components/chatwindow/chatwindow'


const mapStatetoProps = state =>({
    chatLog: state.chatLog
})

export default connect(mapStatetoProps)(Chat)
