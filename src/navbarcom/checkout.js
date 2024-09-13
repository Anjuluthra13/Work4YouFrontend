import React, { useState } from 'react';
import { CartState } from '../reducer/Context';
import qrImage from '../Imagesmall/qrimage.jpeg'; // Replace with the path to your QR code image

const Checkout = () => {
  const {
    state: { cart },
    userData,
  } = CartState();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const total = cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setCardType('');
    setModalMessage('');
  };

  const handleCardTypeChange = (type) => {
    setCardType(type);
    setCardDetails({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
    });
    setModalMessage('');
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.match(/.{1,4}/g).join(' ').slice(0, 19);
    return formatted;
  };

  const handleCardDetailChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      const formattedNumber = formatCardNumber(value);
      setCardDetails({
        ...cardDetails,
        [name]: formattedNumber,
      });
    } else if (name === 'cvv') {
      const formattedCVV = value.replace(/\D/g, '').slice(0, 3);
      setCardDetails({
        ...cardDetails,
        [name]: formattedCVV,
      });
    } else {
      setCardDetails({
        ...cardDetails,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    if (paymentMethod === 'Card' && cardType) {
      const { cardNumber, cardHolder, expiryDate, cvv } = cardDetails;
      const cardNumberDigits = cardNumber.replace(/\s/g, '');

      if (cardNumberDigits.length !== 16) {
        setModalMessage('Card number must be exactly 16 digits');
        setIsModalOpen(true);
        return;
      }

      if (cvv.length !== 3) {
        setModalMessage('CVV must be exactly 3 digits');
        setIsModalOpen(true);
        return;
      }

      if (!cardHolder) {
        setModalMessage('Card holder name is required');
        setIsModalOpen(true);
        return;
      }

      const [expMonth, expYear] = expiryDate.split('/').map(num => num.trim());
      if (expMonth.length !== 2 || expYear.length !== 2 || isNaN(expMonth) || isNaN(expYear)) {
        setModalMessage('Invalid expiry date format');
        setIsModalOpen(true);
        return;
      }

      const month = parseInt(expMonth, 10);
      const year = parseInt(expYear, 10);
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (month < 1 || month > 12) {
        setModalMessage('Month must be between 01 and 12');
        setIsModalOpen(true);
        return;
      }

      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        setModalMessage('Expiry date must be a future date');
        setIsModalOpen(true);
        return;
      }

      setModalMessage('Payment Successful');
      setIsModalOpen(true);
    } else if (paymentMethod === 'Cash') {
      setModalMessage('Order Successful');
      setIsModalOpen(true);
    } else if (paymentMethod === 'UPI') {
      setModalMessage('Payment Successful');
      setIsModalOpen(true);
    } else {
      setModalMessage('Please select a payment method');
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');

    // Show alert with the custom message
    alert(`Thank you for choosing Work4You, ${userData.name}. All the details will be sent to you on your email soon.`);
  };

  return (
    <div style={{ margin: '2rem auto', maxWidth: '600px', fontFamily: 'Arial, sans-serif' }}>
      <div>
        <h2 style={{ marginBottom: '1.5rem', color: '#333', textAlign: 'center' }}>Payment Page</h2>
        <hr style={{ borderTop: '1px solid #eee' }} />
        <h4 style={{ color: '#555', marginBottom: '1rem' }}>Selected Services:</h4>
        <ul style={{ paddingLeft: '20px', marginBottom: '1.5rem' }}>
          {cart.map((prod) => (
            <li key={prod.id} style={{ marginBottom: '0.5rem' }}>
              {prod.service} - ₹ {prod.price} x {prod.qty}
            </li>
          ))}
        </ul>
        <h4 style={{ marginBottom: '1rem', color: '#333' }}>Total Amount: ₹ {total}</h4>
        <hr style={{ borderTop: '1px solid #eee' }} />
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ marginBottom: '1rem', color: '#333' }}>Select Payment Method:</h4>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <button
              onClick={() => handlePaymentMethodChange('UPI')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: paymentMethod === 'UPI' ? '#007bff' : '#f7f7f7',
                color: paymentMethod === 'UPI' ? 'white' : '#555',
                border: '1px solid #ccc',
                borderRadius: '5px',
                flex: 1,
                marginRight: '0.5rem',
                cursor: 'pointer',
              }}
            >
              UPI
            </button>
            <button
              onClick={() => handlePaymentMethodChange('Cash')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: paymentMethod === 'Cash' ? '#007bff' : '#f7f7f7',
                color: paymentMethod === 'Cash' ? 'white' : '#555',
                border: '1px solid #ccc',
                borderRadius: '5px',
                flex: 1,
                marginRight: '0.5rem',
                cursor: 'pointer',
              }}
            >
              Cash
            </button>
            <button
              onClick={() => handlePaymentMethodChange('Card')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: paymentMethod === 'Card' ? '#007bff' : '#f7f7f7',
                color: paymentMethod === 'Card' ? 'white' : '#555',
                border: '1px solid #ccc',
                borderRadius: '5px',
                flex: 1,
                cursor: 'pointer',
              }}
            >
              Card
            </button>
          </div>
          {paymentMethod === 'UPI' && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <p style={{ marginBottom: '0.5rem', color: '#555' }}>Scan QR Code to Pay:</p>
              <img src={qrImage} alt="QR Code" style={{ width: '150px', border: '1px solid #ccc', borderRadius: '5px' }} />
            </div>
          )}
          {paymentMethod === 'Card' && (
            <div style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <button
                  onClick={() => handleCardTypeChange('Credit')}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: cardType === 'Credit' ? '#007bff' : '#f7f7f7',
                    color: cardType === 'Credit' ? 'white' : '#555',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    flex: 1,
                    marginRight: '0.5rem',
                    cursor: 'pointer',
                  }}
                >
                  Credit Card
                </button>
                <button
                  onClick={() => handleCardTypeChange('Debit')}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: cardType === 'Debit' ? '#007bff' : '#f7f7f7',
                    color: cardType === 'Debit' ? 'white' : '#555',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    flex: 1,
                    cursor: 'pointer',
                  }}
                >
                  Debit Card
                </button>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>Card Number:</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardDetailChange}
                  style={{
                    padding: '0.75rem',
                    width: '100%',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                  }}
                  maxLength="19"
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>Card Holder Name:</label>
                <input
                  type="text"
                  name="cardHolder"
                  value={cardDetails.cardHolder || userData.name} // Use userData name if cardHolder is empty
                  onChange={handleCardDetailChange}
                  style={{
                    padding: '0.75rem',
                    width: '100%',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ flex: 1, marginRight: '0.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>Expiry Date (MM/YY):</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={handleCardDetailChange}
                    style={{
                      padding: '0.75rem',
                      width: '100%',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      boxSizing: 'border-box',
                    }}
                    maxLength="5"
                    placeholder="MM/YY"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>CVV:</label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardDetailChange}
                    style={{
                      padding: '0.75rem',
                      width: '100%',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      boxSizing: 'border-box',
                    }}
                    maxLength="3"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={handleSubmit}
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Pay Now
        </button>
      </div>

      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '5px',
              boxShadow: '0px 0px 10px rgba(0,0,0,0.25)',
              textAlign: 'center',
              maxWidth: '400px',
              width: '100%',
            }}
          >
            <p style={{ marginBottom: '0.5rem', color: '#333' }}>{modalMessage}</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={closeModal}
                style={{
                  padding: '0.5rem 1rem', // Added 1rem padding for horizontal space
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;