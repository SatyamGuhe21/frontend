import {BiUserCircle , BiCheckSquare , BiAddToQueue  } from 'react-icons/bi';
import { PiChefHatLight } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

const tasks = [
    {
        title : 'Dish',
        icon : <BiUserCircle />,
        path : '/alldish',
    },
    {
        title : 'Chef',
        icon : <PiChefHatLight />,
        path : '/allchef',
    },
    {
        title : 'Task',
        icon : <BiCheckSquare />,
        path : '/alltask',
    },
    {
        title : 'Inventory',
        icon : <BiAddToQueue />,
        path : '/allinventory',
    }
]

const Card = () => {      
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
                        <h3>{task.title}</h3>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Card;