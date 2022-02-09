import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Card from '../Card/Card'
const Home = () => {

        const [data , setdata] = useState([])
    const [title , setTitle] = useState('');
    const [message , setMessage] = useState('');

    const AddMessage = async()=>{
        
        if(title=="" || message==""){
            window.alert('Please fill in both the fields to add')
        }
        else{
                try{
                
                const res = await fetch('/addMessage' , { 
                    method:'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body:JSON.stringify({
                        title,message
                    })
                });
                
                const data = res.json();
                if(res.status==201){
                    window.alert('Message added successfully')
                    window.location.reload();
                }
            }
            catch(e){
                console.log(e.message)
            }
        }
    }


    const getMessages =async(e)=>{
const res = await fetch('/getMessage' , { method:'GET'});
const data =await res.json();

setdata(data);
    }

  useEffect(()=>{
        getMessages();
    },[])
        return (
      <Container>
            <Add>
                <Mains>
                    <input type="text" placeholder="Title" value={title}onChange={(e)=>setTitle(e.target.value)}/>
                    <input type="text" placeholder="Note" value={message}onChange={(e)=>setMessage(e.target.value)}/>
                    <button onClick={AddMessage} >Add</button>
                </Mains>
            </Add>
            <Messages>
                
                {data.map((user)=>{
                   

                        return(
                            
                            <Card title={user.title} message={user.message} />
                            )
                })}

                
            </Messages>
      </Container>
  );
};

export default Home;
const Messages = styled.div`
margin-top:3rem;
width:100vw;
display:grid;
grid-template-columns:repeat(3,33.33%)`
const Container = styled.div`
margin-top:2rem;
width:100vw;
height:100%;`
const Add = styled.div`
height:20vh;
display:flex;
justify-content: center;
align-items: center;
`
const Mains = styled.div`
height:100%;
border:1px solid black;
width:30%;
display:flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap:1rem;
border-radius:4px;
box-shadow:  1px 2px 5px black;

input{
    width:80%;
    height:2rem;
    border:none;
    font-size:1rem;
    border-bottom:1px solid black;
}

button{
    width:8rem;
    height:1.6rem;
    border:none;
    outline:none;
    background:transparent;
    box-shadow:0px 1px 3px gray;
    cursor:pointer;

    &:hover{
        box-shadow:0px 2px 3px gray;

    }
}

`