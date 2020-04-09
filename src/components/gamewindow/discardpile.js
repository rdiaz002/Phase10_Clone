import React from 'react'


const DiscardPile = ({discardPile})=>{

    return(
        <div className="Discard">
            <div className="Container">
                <div className="Card">
                <h2>{discardPile[0].type}</h2>
                <h2>{discardPile[0].number}</h2>
                </div>
            </div>
        </div>
        
        

    )


}

export default DiscardPile;