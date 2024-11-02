import React from 'react';
import User from './User';
import useGetAllUsers from '../../context/useGetAllUsers';
import Loading from '../../components/Loading';
function Users() {
    const [allUsers, loading] = useGetAllUsers();

    console.log(allUsers);

    // Ensure we're accessing the `filteredUsers` array if it exists
    const users = allUsers?.filteredUsers || [];

    return (
        <div className="h-full max-h-[500px] overflow-y-scroll p-2 scrollbar-thin scrollbar-thumb-[#128c7e] scrollbar-track-gray-200">
            {loading ? (
                <Loading/>
            ) : (
                users.length > 0 ? (
                    users.map((user, index) => <User key={index} user={user} />)
                ) : (
                    <p>No users found.</p>
                )
            )}
        </div>
    );
}

export default Users;