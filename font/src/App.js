
import axios from './axios.js'
import { useEffect, useState } from 'react'
function App() {
  const token = localStorage.getItem('token');
  const [todos, setTodos] = useState([])
  useEffect(()=>{
    return async() =>{
    if(!token){
      try{
        const response = await axios.post('/login')
        localStorage.setItem('token', response.data.token);
      }catch(err){
        throw new Error(err)
      }
    }else{
      try{
        const data = await axios.get(`/${token}`);
        setTodos(data.data);
      }
        catch(err){
        err.response.data.err === "login please" && axios.post('/login').then((data)=>{localStorage.setItem('token', data.data.token)}).catch((err)=>{throw new Error(err.response.err)});
      }
    }
  }
  },[token]);
  const [doli, setDoli] = useState("");
  const todo = async(e) =>{
    e.preventDefault();
    if(doli !== ""){
      try{
        const data = await axios.post('/create', {data: doli, token})
        setTodos(data.data);
      }catch(err){
        if(err.response.data.err === "login please")
        try{
          const data = await axios.post('/login');
          localStorage.setItem('token', data.data.token);
        }
        catch(err){
          throw new Error (err.response.err)
        };

      }
    }
    setDoli("")
  }
  return (
    <div>
      {
        todos?.map((tod, index)=>(
          <div key={index}>
            <h1>{tod._id}</h1>  
            <div>
              {tod.todos.map((to, index)=>(
                <div key={index}>{to.message}</div>
              ))}
            </div>
          </div>
        ))
      }
      <form onSubmit={todo}>
        <input type="text" value={doli} onChange={(e)=>{setDoli(e.target.value)}} name="todo"/>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
