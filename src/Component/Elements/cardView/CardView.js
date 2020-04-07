import React from 'react'
import './cardView.css'
import CardThumbs from '../CardThumbs/CardThumbs'

const CardView = (props) => {
   const renderElement = () => {
      const gridElement =   props.children.map((element, i) => (
            <div key={i} className="grid-layout-element">{element}</div>
        ))
        return gridElement
    }
  
    return(
        <div className="grid-layout">
            <div className="grid-layout-cols">
                {renderElement()}
            </div>
        </div>
    )
}


export default CardView