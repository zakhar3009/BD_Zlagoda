import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/header/Navbar'
import { Outlet } from 'react-router-dom';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     console.log('fetching');
  //     // https://jsonplaceholder.typicode.com/todos/1
  //     const respone = await fetch('http://localhost:8080/controller')
  //     const data = await respone.json();
  //     setData(data);
  //     setIsLoading(false);
  //     console.log(data)
  //   };

  //   fetchData();
  // }, []);

  return (
    <>

      <Navbar />
      <Outlet />
      <div className='w-screen h-screen'>
        {isLoading && <div>Is Loading </div>}
        {!isLoading && <><h1>Fetched</h1><div>{JSON.stringify(data)}</div></>}
      </div>
    </>
  )
}

export default App
