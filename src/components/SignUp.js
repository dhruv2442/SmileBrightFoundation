import React, { useEffect, useState } from 'react';
import { auth, fs } from '../config/config';
import logo from '../img/signup-removebg-preview.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [matches, setMatches] = useState(
    window.matchMedia('(min-width: 768px)').matches
  );

  const handleSignup = (e) => {
    e.preventDefault();
    // console.log(fullName,email,password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        console.log(credentials);
        // const userId = credentials.user.uid;
        setDoc(doc(fs, 'users', credentials.user.uid), {
          Fullname: fullName,
          email: email,
          password: password,
          mobileNo: Number(mobile)
        })
          .then(() => {
            setSuccessMsg(
              'Signup Successfull. You will now automatically get redirected to Login'
            );
            setFullName('');
            setEmail('');
            setPassword('');
            setMobile('');
            setErrorMsg('');
            setTimeout(() => {
              setSuccessMsg('');
              navigate('/donation');
            }, 3000);
          })
          .catch((error) => setErrorMsg(error.message));
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  useEffect(() => {
    window
      .matchMedia('(min-width: 768px)')
      .addEventListener('change', (e) => setMatches(e.matches));
  }, []);

  return (
    <section id='header' className='d-flex align-items-center'>
      <div className='container-fluid '>
        <div className='row'>
          <div className='col-10 mx-auto'>
            <div className='row'>
              <div className='col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center  flex-column'>
                <h1 className='text-light'>Sign Up</h1>
                <hr />
                {successMsg && (
                  <>
                    <br />
                    <div className='success-msg'>{successMsg}</div>
                  </>
                )}
                <form
                  className='form-group'
                  autoComplete='off'
                  onSubmit={handleSignup}
                >
                  <label className='text-light'>Full Name</label>
                  <input
                    type='text'
                    className='form-control'
                    required
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                  />
                  <br />
                  <label className='text-light'>Email</label>
                  <input
                    type='email'
                    className='form-control'
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
                  <label className='text-light'>Mobile No</label>
                  <input
                    type='number'
                    className='form-control'
                    required
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
                  />
                  <br />
                  <div className='row'>
                    <div className='left col-md-8 col-12'>
                      <span className='text-light'>
                        Already Have an Account Login
                      </span>{' '}
                      <Link
                        to='../login'
                        className='btn btn-sm btn-outline-light'
                      >
                        Here
                      </Link>{' '}
                    </div>
                    <div className='right col-md-4 col-12 text-center py-3'>
                      <button type='submit' className='btn btn-success btn-md'>
                        Sign Up
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
              <div className='col-lg-6 order-1 order-lg-2 header-img'>
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
                    <br />
                    <br />
                    <br />
                    <br />
                  </>
                )}

                <img src={logo} className='img-fluid animated' alt='home img' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
