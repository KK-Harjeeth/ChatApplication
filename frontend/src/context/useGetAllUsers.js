import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

function useGetAllUsers() {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                const token = Cookies.get("jwt");
                const response = await axios.get('https://chatapplication-ivyf.onrender.com/api/user/getUsersProfiles', {
                    
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAllUsers(response.data);
            } catch (error) {
                console.log("Error in useGetAllUsers: " + error);
            } finally {
                setLoading(false);
            }
        };
        getUsers();
    }, []);

    return [allUsers, loading];
}

export default useGetAllUsers;
