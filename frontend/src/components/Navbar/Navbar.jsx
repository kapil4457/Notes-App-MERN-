import React ,{useState} from 'react';
import styled from 'styled-components'
import {NavLink, useHistory} from 'react-router-dom'

const Navbar = () => {
    const history =useHistory();
    const [display,setDisplay] = useState('none');
    const click = ()=>{
        if(display=='none'){
            setDisplay('flex');
        }
        if(display=='flex'){
            setDisplay('none')
        }
    }
    const logout =async(e)=>{
        e.preventDefault();
        const res =await fetch('/logout' , {
            method:'GET',
                       
        });


        if(res.status == 200){
            localStorage.removeItem("email")
            alert('Logged out successfully');
            history.push('/signin')

        }

        if(res.status == 400){
                console.log('Error')
                alert('Please login to access this')
        }
        
    }
  return (
      <Container>
            <Image>
            <div className="image">
                <img src="pencil.png" alt="" />
                <span>Notes App</span>
            </div>
            </Image>
            <Links>
            <NavLink exact to="/" activeClassName="active">Home</NavLink>
            <NavLink exact to="/signin" activeClassName="active">Login</NavLink>
            <NavLink exact to="/signup" activeClassName="active">Register</NavLink>
            <img src="user.png" alt="" onClick={click}/>
            </Links>
                <Logout style={{display:display}} >
                    <NavLink exact to="/signout" onClick={logout}>Logout</NavLink>
                </Logout>

      </Container>
  );
};

export default Navbar;

const Logout =styled.div`
position:absolute;
right:0.5rem;
border:1px solid black;
height:2rem;
display:flex;
justify-content:center;
align-items: center;
width:6rem;
top:4rem;
background:white;
border-radius:4px;
a{
    text-decoration:none;
    color:red;
}
`

const Container = styled.div`
position:relative;
height:5rem;
border-bottom:1px solid black;
display:flex;
justify-content:space-between;
align-items:center;

`
const Image = styled.div`
padding:2rem;
height:100%;
display:flex;
justify-content:center;
align-items:center;
.image{
     height:100%;
     display:flex;

flex-direction:column;
     img{
        height:70%;
        display:flex;
        justify-content:center;
        align-items:center;
        padding-right:1rem;
     }
     span{
         font-weight:bold;
     }
   
}
`
const Links = styled.div`
display:flex;
padding-right:2rem;
gap:2rem;
font-size:1.5rem;
a{
    text-decoration:none;
}

img{
    width:40px;
    height:40px;
    cursor:pointer;

}
`
