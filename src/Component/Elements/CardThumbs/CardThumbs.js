import React from 'react'
import  './CardThumbs.css'

import { Card, Icon, Image } from 'semantic-ui-react'

const CardThumbs = (props) => {
    return (
    //     <div className="card-thumb">
    // <div className = "card-thumb-element">
    //         <img src={props.image} />
    //             <h1>{props.name}</h1>
    //             <h3>{props.age}</h3>
    //         </div>
    //         </div>
    
    <Card>
    <Image src={props.image}  style={{height : '300px'}} />
    <Card.Content>
      <Card.Header>{props.name}</Card.Header>
      <Card.Meta>Joined in 2016</Card.Meta>
      <Card.Description>
            {`${props.name} is ${props.age} year old`}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        10 Friends
      </a>
    </Card.Content>
  </Card>
    
    )
}

export default CardThumbs