import React, { useEffect, useState } from 'react';
import { fs, storage } from '../config/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from '@firebase/firestore';

const Donate = ({user}) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState(null);

  const [imageError, setImageError] = useState('');

  const [successMsg, setSuccessMsg] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [selected, setSelected] = useState('');
  const [preview, setPreview] = useState();
  const [upload,setUpload] = useState(false);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selected) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selected);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selected]);

  const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];
  const handleProductImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelected(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelected(e.target.files[0]);
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImage(selectedFile);
        setImageError('');
      } else {
        setImage(null);
        setImageError(
          'Please select a valid image File type (png / jpeg / jpg)'
        );
      }
    } else {
      console.log('please select your file');
    }
  };

  const handleAddProducts = (e) => {
    e.preventDefault();
    //   console.log(title,category,details);
    //   console.log(image);

    const uploadTask = uploadBytesResumable(
      ref(storage, `product-image/${image.name}`),
      image
    );
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setUpload(true);
      },
      (error) => {
        setUploadError(error.message);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDoc(collection(fs, 'Products'), {
            title: title,
            details: details,
            downloadURL,
            DonatedBy: user.Fullname,
            DonorEmail: user.email,
            DonorMo:user.mobileNo
          })
            .then(() => {
              setSuccessMsg('Product added successfuly');
              setUpload(false);
              setTitle('');
              setDetails('');
              
              
              setImageError('');
              setUploadError('');
              setSelected('')
              // document.getElementById('file').value = '';
              setTimeout(() => {
                setSuccessMsg('');
              }, 3000);
            })
            .catch((error) => setUploadError(error.message));
        });
      }
    );
  };

  //state of products
  // const [products, setProducts] = useState([]);

  // //getting Products function
  // const getProducts = async () => {
  //   const productsArray = [];
  //   const querySnapshot = await getDocs(collection(fs, 'Products'));
  //   querySnapshot.forEach((doc) => {
  //     var data = doc.data();
  //     data.ID = doc.id;
  //     productsArray.push({
  //       ...data,
  //     });
  //     if (productsArray.length === querySnapshot.docs.length) {
  //       setProducts(productsArray);
  //     }
  //     //   console.log();
  //   });
  // };

  // console.log(products)
  // useEffect(() => {
  //   getProducts();
  // }, []);
  return (
    <>
      <div className='container mb-5'>
        <br></br>
        <br></br>
        {(!upload) && <>
        <h1 className='text-light'>Add Object To Donate</h1>
        <hr style={{'height':'5px','background':'white','borderRadius':'20px'}}></hr>
        {successMsg && (
          <>
            <div className='success-msg'>{successMsg}</div>
            <br></br>
          </>
        )}

        <form
          autoComplete='off'
          className='form-group'
          onSubmit={handleAddProducts}
        >
          <label className='text-light'>Object Name</label>
          <input
            type='text'
            className='form-control  bg-dark text-light'
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder='Enter Name'
          ></input>
          <br />
          <br />

          {/* <label for='inputState' className='form-label text-light'>
            Category
          </label>
          <select
            id='inputState'
            class='form-select  bg-dark text-light'
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
            required
          >
            <option selected>Choose Category</option>
            <option>Homepage</option>
            <option>Sweets</option>
            <option>Namkeen</option>
          </select>
          <br />
          <br /> */}
          <label className='text-light'>Donating Object Details</label>
          <textarea
            className='form-control bg-dark text-light'
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
            style={{ resize: 'none' }}
            placeholder='Enter Donating Object Details'
          ></textarea>
          <br />
          <br />
          <label className='text-light'>Upload Object Image</label>
          <input
            type='file'
            id='file'
            className='form-control bg-dark text-light'
            required
            onChange={handleProductImage}
          ></input>

          {imageError && (
            <>
              <br></br>
              <div className='error-msg'>{imageError}</div>
            </>
          )}
          <br />

          <div className='row'>
              <div className='col-md-12 col-lg-6'>
                {selected && (imageError === '') && (
                    <img className='previewImg'
                      src={preview}
                      alt='preview'
                      style={{ 'width': '300px' }}
                    />
                )}
              </div>
              <div className='col-md-12 col-lg-4 d-flex justify-content-end align-items-start'>
                <div className=''>
                  <button type='submit' className='btn btn-info btn-md'>
                    SUBMIT
                  </button>
                </div>
              </div>
          </div>
        </form> </>}
        {upload && <div className='text-center'>
          <button className="btn btn-primary" type="button" disabled>
  <span className="spinner-border spinner-border-md" role="status" aria-hidden="true">  </span>
      <h6>   please wait while uploading...</h6>
</button>
        </div>}
        {uploadError && (
          <>
            <br></br>
            <div className='error-msg'>{uploadError}</div>
          </>
        )}
      </div>
    </>
  );
};

export default Donate;
