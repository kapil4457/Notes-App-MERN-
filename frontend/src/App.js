import Navbar from './components/Navbar/Navbar'
import {Switch , Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
function App() {
  return (
    <>
    <Navbar />
    <Switch> 
      <Route exact path="/"><Home /></Route>
      <Route exact path="/signin"><Login /></Route>
      <Route exact path="/signup"><Register /></Route>
      
      
    
    </Switch>
    </>
  );
}

export default App;
