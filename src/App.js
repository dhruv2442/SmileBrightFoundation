// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Donate from './components/Donate';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { auth, fs } from './config/config';
import Profile from './components/Profile';
import Donation from './components/Donation';
import Object from './components/Object';
// import Footer from './components/Footer';

function App() {
  const [login, setLogin] = useState(false);
  //get current user function
  const GetCurrentUser = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          getDoc(doc(fs, 'users', user.uid)).then((snapshot) => {
            setUser(snapshot.data());
          });
        } else {
          setUser(null);
        }
      });
    }, []);

    return user;
  };
  const user = GetCurrentUser();
  // console.log(user);

  //state of products
  const [products, setProducts] = useState([]);

  //getting Products function
  const getProducts = async () => {
    const productsArray = [];
    const querySnapshot = await getDocs(collection(fs, 'Products'));
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      data.ID = doc.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === querySnapshot.docs.length) {
        setProducts(productsArray);
      }
      //   console.log();
    });
  };

  // console.log(products)
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className='loginMain'>
      <Router>
      <NavBar user={user} login={login} setLogin={setLogin}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login setLogin={setLogin} />} />
          <Route path="/donate" element={<Donate user={user} />} />
          <Route path='/profile' element ={<Profile user={user} products={products}/>}/>
          <Route path='/donation' element ={<Donation user={user} products={products}/>}/>
          <Route path='/donation/:objId' element ={<Object user={user} products={products}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
