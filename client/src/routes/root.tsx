import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { UserProvider } from '../context/userprovider/UserProvider';

// Root

const Root = () => {
    return (
        <UserProvider>
            <div className="min-h-screen bg-black text-white">
                <Navbar />
                <Outlet />
            </div>
        </UserProvider>
    );
};

export default Root;
