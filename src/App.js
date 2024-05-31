import './App.css';
// import { PersistGate } from 'redux-persist/integration/react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Orders from './Pages/Orders';
import Login from './Pages/Login';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function App() {
   const userDetails = useSelector(state => state.user)

   const [user, setUser] = useState()

   useEffect(() => {
    if(userDetails?.id){
      setUser(userDetails)
    }

  }, [userDetails])
  
  return (
    <ChakraProvider>  
      <div className="App">
        {
          user?.id
          ?
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Orders/>}/>
            </Routes>
          </BrowserRouter>          
          :
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login/>}/>
            </Routes>
          </BrowserRouter>  

        }
      </div>
    </ChakraProvider>
  );
}

export default App;
