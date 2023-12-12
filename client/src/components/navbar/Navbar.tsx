import { Link } from "react-router-dom";
import { useUser } from "../../context/userprovider/UserProvider";

// Navbar

const Navbar = () => {
    const { user, logout } = useUser();

    const handleLogout = () => {
        logout();
    };

    const isAdmin = user && user.role === 'admin';

    return (
        <>
            <div className="fixed top-0 w-full flex justify-center border-b border-neutral-900 bg-black backdrop-blur-sm z-30 transition-all bg-opacity-10">
                <div className="mx-5 flex items-center h-12 max-w-screen-xl w-full justify-between">
                    <div className="flex items-center">
                        <Link to="/">
                            <h1 className="text-white">MariaDB API</h1>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center gap-10">
                        {isAdmin && (
                            <Link to="/manage-users">
                                <p className="text-sm">
                                    Manage Users
                                </p>
                            </Link>
                        )}
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="rounded-md border-2 bg-opacity-30 border-neutral-900 bg-black p-1 px-3 text-sm text-white transition-all hover:bg-neutral-900"
                                style={{ width: '80px' }}
                            >
                                Log Out
                            </button>
                        ) : (
                            <Link to="/login">
                                <button className="rounded-md border-2 bg-opacity-30 border-neutral-900 bg-black p-1 px-3 text-sm text-white transition-all hover:bg-neutral-900"
                                    style={{ width: '80px' }}
                                >
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
