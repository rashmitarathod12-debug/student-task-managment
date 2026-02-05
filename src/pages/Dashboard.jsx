import React, { useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList'

const Dashboard = () =>{

  const navigate = useNavigate();
  const [tasks,setTasks] = useState([]);

  useEffect(() => {
    fetchData();
  },[])

  const fetchData = async () =>{
    try{
    const response = await fetch("http://localhost:3000/tasks")
    const data = await response.json();
    setTasks(data);
    }
    catch(error){
      console.log(error);
    }
  };

  const handleLogout = () =>{
    localStorage.removeItem("authData");
    localStorage.removeItem("logindata");
    navigate("/login");
     //localStorage.clear();
    //console.log("click from dashboard")
  };
return(
    <div>
      <Navbar title="Task management" onLogout={handleLogout}/>
      <h1>My Task</h1>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Dashboard;
