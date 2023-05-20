import axios from 'axios'
import './App.css'
import Navbar from './components/Navbar'
import Weather from './components/Weather'
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
// console.log('VITE_API_BASE_URL:', axios.defaults.baseURL);
axios.defaults.withCredentials =  true

function App() {
  return (
    <>
      <Navbar/>
      <Weather/>
    </>
  )
}

export default App
