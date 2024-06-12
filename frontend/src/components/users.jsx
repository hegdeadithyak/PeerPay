import { useState } from "react";
import PropTypes from 'prop-types';

export const User = () => {
    const [users, setUsers] = useState([]);
    fetch("http://localhost:3000/api/v1/users")
        .then((res) => res.json())
        .then((data) => {
            setUsers(data);
        });

    return <>
        <div className="font-bold mt-6 text-lg">Users</div>
        <div className="my-2">
            <input type="text" placeholder="Search" className="w-full px-2 py-1 border rounded border-slate-200"/>
        </div>
        <div>
            {users.map((user) => <Users key={user._id} user={user} />)}
        </div>
    </>
}

export function Users({ user }) {
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full">
            <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                Send Money
            </button>
        </div>
    </div>
}

Users.propTypes = {
    user: PropTypes.object.isRequired,
}
