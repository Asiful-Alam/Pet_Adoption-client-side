
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Component/Footer';

const Root = () => {
    const location =useLocation();
    const noHeaderFooter = location.pathname.includes('login')|| location.pathname.includes('signup')
    return (
        <div>
            <Outlet></Outlet>
            {noHeaderFooter || <Footer />}
        </div>
    );
};

export default Root;