import React from 'react';
import PropTypes from 'prop-types';

const PackagePopup = ({ packageDetails, onClose }) => {
  return (
    <div className="package-popup">
      <div className="popup-content">
        <h2>{packageDetails.name}</h2>
        <p>Price: {packageDetails.price}</p>
        <h4>Advantages:</h4>
        <ul>
          {packageDetails.advantages.map((advantage, index) => (
            <li key={index}>{advantage}</li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

PackagePopup.propTypes = {
  packageDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    advantages: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PackagePopup;
