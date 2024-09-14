import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import { CartState } from '../reducer/Context';
import qrImage from '../Imagesmall/qrimage.jpeg'; // Replace with the path to your QR code image

const Checkout = () => {
  const {
    state: { cart },
    userData,
  } = CartState();

  const history = useHistory(); // Initialize useHistory hook
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
  const [isCardPaymentSuccess, setIsCardPaymentSuccess] = useState(false); // New state variable
  const [isLoading, setIsLoading] = useState(false); // Loading spinner state

  const total = cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setCardType('');
    setModalMessage('');
    setIsCardPaymentSuccess(false); // Reset the success flag on payment method change
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
    setIsCardPaymentSuccess(false); // Reset the success flag on card type change
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
      setIsCardPaymentSuccess(true); // Set success flag for card payment
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
    
    // Show alert with custom message for successful card payment
    if (isCardPaymentSuccess) {
      alert(`Thank you for choosing Work4You, ${userData.name}. All the details will be sent to you on your email soon.`);
    }

    // Display redirect alert
    alert('We are redirecting you to the home page now.');

    // Display loading spinner and redirect after 5 seconds
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      history.push('/'); // Redirect to the home page
    }, 5000);
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
            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#333' }}>UPI Payment</h4>
              <p>Scan the QR code below to complete your payment:</p>
              <img
                src={qrImage}
                alt="QR Code for UPI Payment"
                style={{ maxWidth: '200px', height: 'auto', marginBottom: '1rem' }}
              />
            </div>
          )}
          {paymentMethod === 'Card' && (
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: '#333' }}>Select Card Type:</h4>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}
              >
                <button
                  onClick={() => handleCardTypeChange('Visa')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: cardType === 'Visa' ? '#007bff' : '#f7f7f7',
                    color: cardType === 'Visa' ? 'white' : '#555',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    flex: 1,
                    marginRight: '0.5rem',
                    cursor: 'pointer',
                  }}
                >
                  Visa
                </button>
                <button
                  onClick={() => handleCardTypeChange('MasterCard')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: cardType === 'MasterCard' ? '#007bff' : '#f7f7f7',
                    color: cardType === 'MasterCard' ? 'white' : '#555',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    flex: 1,
                    cursor: 'pointer',
                  }}
                >
                  MasterCard
                </button>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ color: '#333', display: 'block', marginBottom: '0.5rem' }}>
                  Card Number:
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardDetailChange}
                  placeholder="1234 5678 9012 3456"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                  }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ color: '#333', display: 'block', marginBottom: '0.5rem' }}>
                  Card Holder Name:
                </label>
                <input
                  type="text"
                  name="cardHolder"
                  value={cardDetails.cardHolder}
                  onChange={handleCardDetailChange}
                  placeholder="John Doe"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ flex: 1, marginRight: '0.5rem' }}>
                  <label style={{ color: '#333', display: 'block', marginBottom: '0.5rem' }}>
                    Expiry Date (MM/YY):
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={handleCardDetailChange}
                    placeholder="MM/YY"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ color: '#333', display: 'block', marginBottom: '0.5rem' }}>
                    CVV:
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardDetailChange}
                    placeholder="123"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Confirm Payment
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '10px',
              width: '80%',
              maxWidth: '500px',
              textAlign: 'center',
            }}
          >
            <h2 style={{ marginBottom: '1rem' }}>{modalMessage}</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={closeModal}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            className="spinner"
            style={{
              width: '50px',
              height: '50px',
              border: '5px solid #ccc',
              borderTop: '5px solid #007bff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
