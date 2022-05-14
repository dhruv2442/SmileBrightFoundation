import React from 'react';
import { Link } from 'react-router-dom';

const Profile = ({ user, products }) => {
  const obj = products.filter((x) => x.DonorEmail === user.email);
  return (
    <>
      <div className='container text-left'>
      <center className='text-light'><h1>Profile</h1></center>
        <h1 className='text-light'>Name:-    {user.Fullname}</h1>
        <h1 className='text-light'>Email:-     {user.email}</h1>
        <h1 className='text-light'>Mobile:-  {user.mobileNo}</h1>

        <br />
        <br />
        <h1 className='text-light'>Your Donation</h1>
      </div>
      <div className='container-fluid row row-cols-1 row-cols-md-2 g-4'>
        {obj.map((product) => {
          return (
            <div className='col-md-4 col-10 mx-auto'>
              <div className='card' style={{ maxWidth: '500px' }}>
                <div className='row g-0'>
                  <div className='col-sm-5 d-flex justify-content-center align-items-center'>
                    <img
                      src={product.downloadURL}
                      className='card-img-top image'
                      alt={product.downloadURL}
                    />
                  </div>
                  <div className='col-sm-7'>
                    <div className='card-body'>
                      <h5 className='card-title'>{product.title}</h5>
                      <p className='card-text'>{product.details}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Profile;
