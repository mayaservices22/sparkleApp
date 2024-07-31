import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";
import Otp from "./Pages/Otp";
import PinPage from "./Pages/PinPage";
import MailPage from "./Pages/MailPage";



function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/otp" element={<Otp/>}/>
          <Route path="/pin" element={<PinPage/>}/>
          <Route path="/mail" element={<MailPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
