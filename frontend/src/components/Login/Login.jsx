import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
const Login = () => {
    const history = useHistory()
    const [email ,setemail] = useState('');
    const [password , setpass] = useState('');


    const LoginUser = async(e)=>{
        e.preventDefault();
        const res = await fetch('/login' , { 
            method:'POST', 
            credentials: 'include',
            headers:{
                'Content-Type' : 'application/json'
            }, 
            body:JSON.stringify({
                email,password
            })

        });

        const data = res.json();
        if(res.status==400){
            window.alert('Invalid Creditentials')
            history.push('/signin')
        }
        if(res.status==200){
            window.alert('Logged in successfully')
            localStorage.setItem('email',email);
            history.push('/')
        }
    }
  return(
      <>
      <Container>
        <Form>
            <form method="POST">
            <h1>Login</h1>
                
                <div className="field">
            <label htmlFor="email">Email</label>
            <input type="text" placeholder="Enter your Email" name="email" value={email} onChange={(e)=>setemail(e.target.value)} />
                </div>
                <div className="field">
            <label htmlFor="password">Password</label>
            <input type="text" placeholder="Enter your Password" name="password"  value={password} onChange={(e)=>setpass(e.target.value)} />
                </div>
                
                <div className="field">

                <button onClick={LoginUser}>Login</button>
                </div>
            </form>
        </Form>
      </Container>
      </>
  );
};

export default Login;
const Container = styled.div`
width:100vw;
height:85vh;
display:flex;
justify-content: center;
align-items: center;`
const Form = styled.div`
width:30%;
height:50%;
border:2px solid black;
border-radius:4px;
margin-top:2rem;
form{
    padding:0 2rem;
    h1{
        width:100%;
        text-align: center;
    }
    .field{
        display:flex;
        margin-bottom:1rem;
        width:100%;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        label{
            width:80%;
            text-align: left;
        }
        input{
            width:80%;
            height:1.2rem;
        }
        button{
            margin-top:2rem;
            width:50%;
            height:1.9rem;
            border:none;outline:none;
            background:transparent;
            box-shadow:2px 0px 3px gray;
            cursor:pointer;
        }
    }
  

}
`