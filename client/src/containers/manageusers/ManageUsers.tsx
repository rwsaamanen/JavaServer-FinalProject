import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    id: number;
    username: string;
    role: string;
}

// ManageUsers

const ManageUsers = () => {
    const [users, setUsers] = useState<User[]>([]);

    // handleModifyRoles

    const handleModifyRoles = async (userId: number, currentRole: string) => {
        try {
            const newRole = currentRole === 'user' ? 'admin' : 'user';

            const response = await axios.put(`http://localhost:8080/users/${userId}/role/${newRole}`);
            if (response.status === 200) {
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.id === userId ? { ...user, role: newRole } : user
                    )
                );
                console.log(`Role modified for user with ID: ${userId}`);
            }
        } catch (error) {
            console.error(`Error modifying roles for user with ID ${userId}:`, error);
        }
    };

    // handleRemoveUser

    const handleRemoveUser = async (userId: number) => {
        try {
            await axios.delete(`http://localhost:8080/users/${userId}`);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
            console.log(`User with ID ${userId} removed`);
        } catch (error) {
            console.error(`Error removing user with ID ${userId}:`, error);
        }
    };

    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // Fetch users.

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users');
                console.log(response)
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="flex flex-col min-h-screen pt-[4rem]">
            <div className='flex-grow px-5 mx-auto max-w-screen-xl w-full py-8'>
                <h1 className="text-2xl font-bold mb-4 text-left align-baseline">User Management</h1>
                <div className="w-full border border-neutral-500 rounded-md mt-10 shadow-white/40 shadow-md">
                    <div className="flex justify-between bg-black p-2 border-b border-neutral-700 mt-4 pointer-events-none px-5 text-md font-bold underline">
                        <div className="w-1/3 font-bold">Name</div>
                        <div className="w-1/3 font-bold">Role</div>
                        <div className="w-1/3 font-bold">
                            <span>Actions</span>
                        </div>
                    </div>
                    <div className='px-5 py-3 border-b border-neutral-700 text-sm font-semibold pointer-events-none'>
                        <p>Total of {users.length} users</p>
                    </div>
                    {users.map((user, index) => (
                        <div key={user.id} className={`flex px-5 items-center py-3 ${index === users.length - 1 ? '' : 'border-b border-neutral-700'}`}>
                            <div className="w-1/3 text-xs font-bold pointer-events-none">{user.username}</div>
                            <div className="w-1/3 pointer-events-none">
                                <div
                                    className={`text-xs font-bold rounded-2xl w-14 px-1 py-1 flex items-center justify-center ${user.role === 'admin' ? 'bg-black text-white border-2 border-neutral-700' : 'bg-white text-black border-2 border-neutral-700'
                                        }`}
                                >
                                    {capitalizeFirstLetter(user.role)}
                                </div>
                            </div>
                            <div className="w-1/3 flex gap-5 text-xs font-semibold cursor-pointer">
                                <span onClick={() => handleModifyRoles(user.id, user.role)}>Change Role</span>
                                <span onClick={() => handleRemoveUser(user.id)}>Remove User</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ManageUsers;
