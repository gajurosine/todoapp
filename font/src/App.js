
import axios from 'axios';
import {socket} from './axios.js'
import {useEffect} from 'react'
function App() {
  const token  = localStorage.getItem('token');
useEffect(()=>{
  if(!token){
    axios.post('http://localhost:5000/login').then((data)=>{localStorage.setItem('token', data.data)}).catch((error) =>{console.log(error)})
  }
  console.log(token.data)
  socket.emit('join-room', token);
},[])
  return (
    <div className="App">

    </div>
  );
}

export default App;
