import React,{useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/config';
import { signOut } from '@firebase/auth';

const NavBar = ({ user}) => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    });
  };
 

  useEffect(() => {
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);
  return (
    <div className='m-0'>
      <nav className='navbar navbar-expand-lg navbar-dark bg-transparent'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
          {matches && (<h3 className='text-light head-title'>The Smile 🙂 Bright 🔆 Foundation 🌞</h3>)}
          {!matches && (<h6 className='text-light head-title'>The Smile 🙂 Bright 🔆 Foundation 🌞</h6>)}
          </Link>
          <button
            type='button'
            className='navbar-toggler'
            data-bs-toggle='collapse'
            data-bs-target='#navbarCollapse'
          >
            <span className='navbar-toggler-icon text-light'>
            </span>
          </button>
          <div className='collapse navbar-collapse' id='navbarCollapse'>
            <div className='navbar-nav ms-auto'>
            {!user && (
           <>
            <Link className='btn btn-primary mx-2 my-2' to='/signup'>
                signup
              </Link>
            
            <Link className='btn btn-primary mx-2 my-2' to='/login'>
                login
              </Link>
              </>
            )}
            {user && (
           <>
           
           <Link className='btn btn-primary mx-2 my-2' to='/donate'>
                Donate
              </Link>
              <Link className='btn btn-primary mx-2 my-2' to='/donation'>
                Donation
              </Link>
              
            <div className='btn btn-danger mx-2 my-2' onClick={handleLogout}>
                logout
              </div>
              <Link className='btn btn-primary mx-2 my-2' to='/profile' title="Profile">
                {user.Fullname[0]}
              </Link>
            
              </>
            )}
            </div>
          </div>
        </div>
      </nav>
    </div>
    // <div className='navbar'>
    //   <div className='leftside'>
    //     <div className='logo'>
    //       <h1>The Smile 🙂 Bright 🔆 Foundation 🌞</h1>
    //     </div>
    //   </div>
    //   <div className='rightside'>
    //     {!user && (
    //       <>

    //         <div>
    //           <Link className='navlink nav-hover' to='signup'>
    //             SIGN UP
    //           </Link>
    //         </div>
    //         <div>
    //           <Link className='navlink nav-hover' to='login'>
    //             LOGIN
    //           </Link>
    //         </div>
    //       </>
    //     )}
    //     {user && (
    //       <>
    //         <div>
    //           <Link className='navlink nav-hover' to='/'>
    //             User: - {user}
    //           </Link>
    //         </div>
    //         <div>
    //           <Link className='navlink nav-hover' to='/donation'>
    //             Donation
    //           </Link>
    //         </div>
    //         <div>
    //           <Link className='navlink nav-hover' to='/donate'>
    //             Donate
    //           </Link>
    //         </div>
    //         <div className='btn btn-danger btn-md' onClick={handleLogout}>
    //           LOGOUT
    //         </div>
    //       </>
    //     )}
    //   </div>
    // </div>
  );
};

export default NavBar;
