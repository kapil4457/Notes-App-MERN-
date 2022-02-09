import React from 'react'
import styled from 'styled-components'
const Card = (props) => {
  return (
    <Cards>
                     <CardCont>
 
 
                     <h1>{props.title}</h1>
                     <p>{props.message}</p>
                     </CardCont>
                 </Cards>
  )
}

export default Card;
const CardCont = styled.div`
border-radius:4px;
width:70%;
height:35vh;
border:2px solid black;
display:flex;
flex-direction:column;
justify-content:center;align-items:center;
h1{
    height:10%;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:1.5rem;
    font-family:monospace;
}
p{
    width:100%;
    font-size:1.1rem;;
    text-align:left;
    padding-left:1rem;
    height:80%;
    
}

`
const Cards = styled.div`
display:flex;
flex-direction:column;
justify-content:center;align-items:center;
margin-top:2rem;
`
