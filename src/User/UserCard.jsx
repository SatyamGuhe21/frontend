import {BiUserCircle , BiCheckSquare , BiAddToQueue  } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const tasks = [
    {
        title : 'All User',
        icon : <BiUserCircle />,
        path : '/allusers',
    },
    {
        title : 'Create User',
        icon : <BiCheckSquare />,
        path : '/register',
    }
]

const DishCard = () => {      
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

export default DishCard;