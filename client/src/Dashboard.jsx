import axios from 'axios';
import React, { useState ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Header from './components/layouts/Header';
import Invoices from './components/invoices/Invoices';
import InvoiceState from './context/invoice/InvoiceState';
import DarkState from './context/dark/DarkState';
import { CSSTransition } from 'react-transition-group';
import Footer from './components/Footer';
import './Dashboard.scss';
const Dashboard = () => {
  const [appearContent] = useState(true);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
        const response = await axios.get("http://localhost:3001/login/success", { withCredentials: true });

        console.log("response",response)
    } catch (error) {
      navigate("*")
    }
}


useEffect(() => {
  getUser()
}, [])
  return (
   // Fade in on initial load
//    <CSSTransition
//    in={appearContent}
//    appear={true}
//    timeout={300}
//    classNames='fade'
//  >
   <main id='main-app'>
     <InvoiceState>
       <DarkState>
         <Navbar />
         <Header />
         <Invoices />
         <Footer/>
       </DarkState>
     </InvoiceState>
   </main>
//  </CSSTransition>
  )
}

export default Dashboard;