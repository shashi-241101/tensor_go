import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import InvoiceContext from '../context/invoice/invoiceContext';

function Footer() {
  const [userdata, setUserdata] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [jsonDataArray, setJsonDataArray] = useState([]);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:3001/login/success", { withCredentials: true });
      console.log("response", response.data.user);
      setUserdata(response.data.user); // Assuming 'user' contains the googleId
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const invoiceContext = useContext(InvoiceContext);
  const {
    invoices,
    filters,
    getInvoices,
  } = invoiceContext;

  useEffect(() => {
    getInvoices();
  }, []);

  useEffect(() => {
    const filteredInvoices = invoices
      .filter((invoice) => filters.includes(invoice.status))
      .filter((invoice) => invoice.googleId === userdata.googleId && invoice.status === 'pending');

    setFilteredData(filteredInvoices);
  }, [invoices, filters, userdata.googleId]);


  const sendDataToBackend = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      // Assuming your backend API endpoint is http://localhost:3001/api/invoices
      const response = await axios.post('http://localhost:3001/api/trigger', { data: jsonDataArray });

      console.log('Data sent to backend successfully', response.data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };
  const footerStyle = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    background: '#f1f1f1',
    padding: '10px',
    textAlign: 'center',
  };

  useEffect(() => {
    const jsonData = filteredData.map((invoice) => ({
      id: invoice.id,
      googleId: invoice.googleId,
      createdAt: invoice.createdAt,
      paymentDue: invoice.paymentDue,
      description: invoice.description,
      paymentTerms: invoice.paymentTerms,
      clientName: invoice.clientName,
      clientEmail: invoice.clientEmail,
      status: invoice.status,
      total: invoice.total,
    }));

    // Update the state with the JSON data array
    setJsonDataArray(jsonData);
  }, [filteredData]);


  return (
    <div style={footerStyle}>
      {console.log(jsonDataArray)}

      {console.log(JSON.stringify(jsonDataArray, null, 2))}
      <button
  onClick={sendDataToBackend}
  style={{
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  }}
>
  Send Reminder
</button>
    </div>
  );
}

export default Footer;
