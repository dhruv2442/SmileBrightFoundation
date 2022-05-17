import React from 'react';
import { useParams } from 'react-router-dom';

const Object = ({ products }) => {
  const params = useParams();
  const objId = params.objId;

  const obj = products.find((x) => x.ID === objId);
  return (
    <div className='container mx-auto'>
      <div className='row'>
        <div className=' col-md-5 col-10 text-light'>
          <div className='col-12 h-100 d-flex justify-content-center align-items-center'>
            <img className='card-img-top image' src={obj.downloadURL} alt='' />
          </div>
        </div>
        <div className=' col-md-7 col-10 text-light'>
          <h1>{obj.title}:-</h1>
          <h2 className='text-light'>
          Details:- {obj.details}
          </h2>
        <br />
        <br />
        <br />
        <br />
        <h1>Donated By:-</h1>
        <br />
        <h3>{obj.DonatedBy}</h3>
        <h3>{obj.DonorEmail}</h3>
        <h3>{obj.DonorMo}</h3>
        </div>
      </div>
    </div>
  );
};

export default Object;

//  <div className='container'>
//     <div className='card' style={{ maxWidth: '500px' }}>
//                 <div className='row g-0'>
//                   <div className='col-sm-5 d-flex justify-content-center align-items-center'>
//                     <img
//                       src={obj.downloadURL}
//                       className='card-img-top image'
//                       alt={obj.downloadURL}
//                     />
//                   </div>
//                   <div className='col-sm-7'>
//                     <div className='card-body'>
//                       <h5 className='card-title'>{obj.title}</h5>
//                       <p className='card-text'>{obj.details}</p>
//                       {/* <Link
//                         to={obj.ID}
//                         className='btn btn-primary stretched-link'
//                       >
//                         Contact Donor
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               </div> */}
