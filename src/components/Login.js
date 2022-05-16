import React, { useEffect, useState } from 'react';
import logo from '../img/login.png';
import { auth } from '../config/config';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Link, useNavigate} from 'react-router-dom';
// import Footer from './Footer';

const Login = ({setLogin}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [matches, setMatches] = useState(
    window.matchMedia('(min-width: 768px)').matches
  );

  useEffect(() => {
    window
      .matchMedia('(min-width: 768px)')
      .addEventListener('change', (e) => setMatches(e.matches));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        setSuccessMsg('Login Successfull. You will now automatically get redirected to HomePage');
            setEmail('');
            setPassword('');
            setErrorMsg('');
            setTimeout(()=>{
                setSuccessMsg('');
                setLogin(true);
                navigate('/donation',{replace:true});
            },3000)
        // ...
      })
      .catch((error) => {
        setErrorMsg(error.message)
      });
  };
  return (
    <>
    <section id="header" className="d-flex justify-content-center align-items-center">
    <div className="container-fluid ">
      <div className="row">
        <div className="col-10 mx-auto">
          <div className="row">
            <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center  flex-column">
      <h1 className='text-light'>Login</h1>
      <hr />
      {successMsg && (
        <>
          <br />
          <div className='success-msg'>{successMsg}</div>
        </>
      )}
      <form className='form-group' autoComplete='off' onSubmit={handleLogin}>
        <label className='text-light'>Email</label>
        <input
          type='email'
          className='form-control '
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <label className='text-light'>Password</label>
        <input
          type='password'
          className='form-control'
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <div className='row'>
          <div className='left col-md-8 col-12'>
            <span className='text-light'>Don't Have an Account SignUp</span>{' '}
            <Link to='../signup' className='btn btn-sm btn-outline-light'>Here</Link>{' '}
          </div>
          <div className='right col-md-4 col-12 text-center py-3'>
            <button type='submit' className='btn btn-info btn-md'>
              Login
            </button>
          </div>
        </div>
      </form>
      {errorMsg && (
        <>
          <br />
          <div className='error-msg'>{errorMsg}</div>
        </>
      )}
            </div>
            <div className="col-lg-6 order-1 order-lg-2 header-img">
            {!matches && (
                  <>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </>
                )}
              <img
                src={logo}
                className="img-fluid animated"
                alt="home img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
    
    // <div className='container' style={{'maxWidth':'60%','overflow':'scroll-x'}}>
      
    // </div>
  );
};

export default Login;
