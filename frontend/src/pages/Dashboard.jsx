import axios from "axios";
import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Bottombutton } from "../components/bottombutton";
import { User } from "../components/users";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
    const [user, setUser] = useState({ friends: [] });
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/signin");
                    return;
                }
                const userResponse = await axios.get("/api/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const balanceResponse = await axios.get("/api/v1/user/balance", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(balanceResponse);
                setUser(userResponse.data);
                setBalance(balanceResponse.data.balance);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    if (loading) {
        return <div className="bg-gray-100 h-screen flex items-center justify-center text-xl font-semibold">Loading...</div>;
    }

    if (error) {
        return (
            <div className="bg-gray-100 h-screen flex items-center justify-center">
                <div className="text-red-500 text-lg">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Appbar />
            <div className="container mx-auto p-4 md:p-8">
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <Balance value={balance} />
                </div>
                {user && user.username && (
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-3xl font-bold mb-4">{user.username}</h2>
                        <h3 className="text-xl font-semibold mb-2">Friends:</h3>
                        <ul className="list-disc list-inside space-y-2">
                            {user.friends.map((friendId) => (
                                <li key={friendId} className="text-lg">{friendId}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <User />
                </div>
                <div className="fixed bottom-0 left-0 right-0 bg-gray-800 py-4">
                    <div className="container mx-auto flex justify-center">
                        <Bottombutton
                            label="Logout"
                            onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/signin");
                            }}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
