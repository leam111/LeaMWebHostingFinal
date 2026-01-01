import {Link} from 'react-router-dom'
import './navbar.css';
import "bootstrap/dist/css/bootstrap.min.css"; 
const Navbar=()=>{

return(<>

<div className="navbar navbar d-flex justify-content-center align-items-center">
<div className='nav-links "d-flex gap-4'>
<Link to = '/product' className='nav-link'>Products</Link>
<Link to ="/admin" className='nav-link'>Admin Page </Link>
</div>
</div>
</>);
}

export default Navbar;