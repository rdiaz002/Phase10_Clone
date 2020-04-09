import React from 'react'
import {updatePlayerName} from '../../actions'
import {updatePlayerName as serverNameUpdate} from '../../api'
const NameWindow=(props)=>{

    var name=""

    const handleChange=(e)=>{
        name=e.target.value
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(name!==""){
            props.dispatch(updatePlayerName(name))
            serverNameUpdate(name)
        }
    }

    return (
        <div className="overlay">
        <form className= "nameChangeForm">
        <input type="text" onChange={handleChange} placeholder="Enter Your Name"/>
        <button onClick= {handleSubmit}>Submit</button>
        </form>
        </div>
    )
}

export default NameWindow
