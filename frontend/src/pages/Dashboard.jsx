import axios from "axios";
import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Bottombutton } from "../components/bottombutton";
import { User } from "../components/users";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

// other imports...

export function Dashboard() {
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate();

    
    // Render user information and friends' IDs
    return (
        <div className="bg-black h-screen">
            <div className="bg-gray-100 h-screen m-5 p-5">
                <Appbar />
                <Balance value={balance} />
                {user && (
                    <div>
                        <h2>{user.username}</h2>
                        <h3>Friends:</h3>
                        <ul>
                            {user.friends.map(friendId => (
                                <li key={friendId}>{friendId}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <User />
                <Bottombutton label="Logout" onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/signin");
                }} />
            </div>
        </div>
    );
}