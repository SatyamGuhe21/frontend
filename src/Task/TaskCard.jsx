import {BiUserCircle , BiCheckSquare , BiAddToQueue  } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const tasks = [
    {
        title : 'Restaurants',
        icon : <BiAddToQueue />,
        path : '/restaurants',
    },
    {
        title : 'All Task',
        icon : <BiUserCircle />,
        path : '/alltask',
    },
    {
        title : 'Create Task',
        icon : <BiCheckSquare />,
        path : '/addtask',
    },
    
]

const TaskCard = () => {      
    const navigate = useNavigate();              
    return (
        <div className="card--container">
            {tasks.map((task) => (
                <div 
                    className="card"
                    onClick={() => navigate(task.path)}
                >
                    <div className="card--cover">
                        {task.icon}
                    </div>
                    <div className="card--title">
                        <h2>{task.title}</h2>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TaskCard;