

import React from 'react';
import './App.css'; // Import your CSS file for styling

const Card = ({ imageUrl, description, onCardClick }) => {
  const handleAddToCart = (event) => {
    event.stopPropagation(); // Prevents the onClick on the card from being triggered
    onCardClick({ imageUrl, description });
  };

  return (
    <div className="card" >
      <img src={imageUrl} alt="Card" className="card-image" />
      <div className="card-content">
        <div className="card-description" style={{color : "white"}}>{description}</div>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Card;
