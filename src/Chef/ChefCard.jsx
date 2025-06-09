import {BiUserCircle , BiCheckSquare , BiAddToQueue  } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const tasks = [
    {
        title : 'All Chef',
        icon : <BiUserCircle />,
        path : '/allchef',
    },
    {
        title : 'Add Chef',
        icon : <BiCheckSquare />,
        path : '/register',
    },
    {
        title : 'Assign Chef',
        icon : <BiAddToQueue />,
        path : '/assignDish',
    }
]

const ChefCard = () => {      
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

export default ChefCard;