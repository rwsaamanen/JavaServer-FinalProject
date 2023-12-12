import UserBoard from '../user/UserBoard';
import AdminBoard from '../admin/AdminBoard';
import { useUser } from '../../context/userprovider/UserProvider';
import { Login } from '../../components';

// Page

const Page = () => {
    const { user } = useUser();

    return (
        <>
            {user && user.role === 'admin' && <AdminBoard />}
            {user && user.role === 'user' && <UserBoard />}
            {!user && <Login />}
        </>
    );
};

export default Page;
