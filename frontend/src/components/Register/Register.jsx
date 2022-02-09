import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'

const Register = () => {
    const history = useHistory();
    const [name , setName] = useState('');
    const [email , setemail] = useState('');
    const [password , setpass] = useState('');
    const [confirmPassword , setconfirmpass] = useState('');


    const handleRegister =async(e)=>{
        e.preventDefault();
        if(name==="" || email==="" || password==="" || confirmPassword==="" ){
                alert('Please fill in all the details')
                history.push('/signup')
        }else{

                try{

                    const res = await fetch('/register' , { 
                        method : 'POST',
                        headers:{
                            'Content-Type' : "application/json"
                        },
                        body:JSON.stringify({
                            name,email,password,confirmPassword
                        })
                    }
                    )
                    
                    
                const data = await res.json();
                if(res.status === 400 || !data){
                    window.alert('User already exists.Try logging in')
                    history.push('/signin')
            }
            else{

                    alert('Registeration successful')
                    history.push('/signin')
                }
            
           
        }catch(e){
            console.log(e.message)
        }
        }
    }
  return(

      <>
      <Container>
        <Form>
            <form method="POST">
            <h1>Register</h1>
                <div className="field">
            <label htmlFor="name">Name</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your name" name="name"/>
                </div>
                <div className="field">
            <label htmlFor="email">Email</label>
            <input type="text" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Enter your Email" name="email" />
                </div>
                <div className="field">
            <label htmlFor="password">Password</label>
            <input type="text" value={password} onChange={(e)=>setpass(e.target.value)} placeholder="Enter your Password" name="password" />
                </div>
                <div className="field">
            <label htmlFor="namconfirmPassworde">Confirm Password</label>
            <input type="text" value={confirmPassword} onChange={(e)=>setconfirmpass(e.target.value)} placeholder="Enter Confirm Password" name="confirmPassword" />
                </div>
                <div className="field">

                <button onClick={handleRegister}>Register</button>
                </div>
            </form>
        </Form>
      </Container>
      </>
  );
};

export default Register;
const Container = styled.div`
width:100vw;
height:85vh;
display:flex;
justify-content: center;
align-items: center;`
const Form = styled.div`
width:30%;
height:60%;
border:2px solid black;
border-radius:4px;
form{
    padding:0 2rem;
    h1{
        width:100%;
        text-align: center;
    }
    .field{
        display:flex;
        margin-bottom:0.5rem;
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
            margin-top:1rem;
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