// import { collection, getDocs } from 'firebase/firestore';
import React from 'react';
import { Link } from 'react-router-dom';
// import { data as products } from '../config/config';
// import { fs } from '../config/config';

const Donation = ({products}) => {
  return (
    <>
      <div className='container-fluid text-light text-center '>
        <h1 className=''>Donation ⁂</h1>
        <br />
        <br />
        <br />
      </div>
      <div className='container-fluid row row-cols-1 row-cols-md-2 g-4'>
        {products.map((product) => {
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
                      <Link
                        to={product.ID}
                        className='btn btn-primary stretched-link'
                      >
                        Contact Donor
                      </Link>
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

export default Donation;
