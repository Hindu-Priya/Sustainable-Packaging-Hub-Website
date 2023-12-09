

import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from './Card';
import image1 from "./resources/9.jpeg";
import image2 from './resources/5.jpeg';
import image3 from "./resources/11.jpeg";
import image4 from './resources/12.jpeg';
import image5 from "./resources/1.jpeg";
import image6 from './resources/6.webp';
import image7 from "./resources/2.png";
import image8 from './resources/3.jpeg';


const Shop = () => {

  // const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDetails, setProductDetails] = useState([]);
  const [showDialogCart, setShowDialogCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [transaction, setTransaction] = useState(false);
  // const [showOrder , setShowOrder] = useState(false);
  const [updateAvailabileQuantity, setUpdateAvailabileQuantity] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if(productName === ""){
      return;
    }
    const fetchData = async () => {
      
        try {
          const response = await fetch(`http://localhost:8000/prodDetails/${productName}`);
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const result = await response.json();
    
          setProductDetails(result);
          console.log(productDetails);
          setShowDialogCart(true);
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    
      fetchData();

      }
     
  }, [productName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/selectedItems/`);
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const result = await response.json();
  
        setCartItems(result);
        console.log(cartItems);
        // setShowDialogCart(true);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [showCart]);
  

  useEffect(() => {
    if(updateAvailabileQuantity === false)
        return;

    const updateItemAvailability = async () => {
      try {

        const response = await fetch('http://localhost:8000/updateAvailability', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productName,
            quantity,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
       
        const result = await response.json();

        if (result.success) {
          // Update succeeded
          console.log('Equipment availability updated successfully.');
        } else {
          // Update failed
          console.error('Equipment not available or out of stock.');
        }
      } catch (error) {
        console.error('Error updating availability:', error);
      }
    };

    // Call the function when the component mounts
    updateItemAvailability();
  }, [updateAvailabileQuantity]); 

  useEffect(() => {
    if(transaction === false) return;

    const updateTransaction = async () => {
      console.log('updatettransaction', productDetails[0]);
      let price = productDetails[0].Price;
      let totalPrice = quantity * price;
      try {
        const response = await fetch('http://localhost:8000/updateTransaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: productName,
            quantity,
            price, 
            totalPrice,
          }),
        });

        // setTransaction(false);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const transactionResult = await response.json();
        
  
        if (transactionResult.success) {
          // Transaction update succeeded
          console.log('Transaction updated successfully.');
        } else {
          console.error('Transaction update failed:', transactionResult.message);
        }
      } catch (error) {
        console.error('Error updating transaction:', error);
      }
    };
    updateTransaction();
  }, [transaction]);


  const handleCheckOut = () => {
    setShowCart(false);
    setUpdateAvailabileQuantity(true);
  }

  

  const handleCardClick = (selectedCard) => {
    // Add the selected card to the cart
    // alert(`${selectedCard.description} added to cart`);
    setUpdateAvailabileQuantity(false);

    setProductName(selectedCard.description);
    setShowDialogCart(true);
   
    // setCart((prevCart) => [...prevCart, selectedCard]);
  };

  const handleAddingToCart = () => {
    setShowDialogCart(false);
    setTransaction(true);
  }

  const cardsData = [
    {
      imageUrl: image1,
      description: 'Paper bowls',
    },
    {
      imageUrl: image2,
      description: 'Fast Food Carry out container',
    },
    {
      imageUrl: image3,
      description: 'Clothes box (high quality)',
    },
    {
      imageUrl: image4,
      description: 'Clothes box',
    },
    {
      imageUrl: image5,
      description: 'Sushi Container',
    },
    {
      imageUrl: image6,
      description: 'Container with holder',
    },
    {
      imageUrl: image7,
      description: 'Container set',
    },
    {
      imageUrl: image8,
      description: 'Carry out containers',
    }
  ];

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    zIndex: '1000',
  };

  return (
    <div >
      {showCart ? (
       <>
          
     <div style={{ textAlign: "center" }}>
  <div style={{ justifyContent: "center", textAlign: "center" }}>
    <h2 style={{ color: "white" }}>Shopping Cart</h2>
    <table
      style={{
        width: "80%",
        margin: "auto",
        color: "white",
        borderCollapse: "collapse",
        marginTop: "20px",
      }}
    >
      <thead>
        <tr>
          <th style={{ padding: "10px", borderBottom: "1px solid white" }}>Item Name</th>
          <th style={{ padding: "10px", borderBottom: "1px solid white" }}>Quantity</th>
          <th style={{ padding: "10px", borderBottom: "1px solid white" }}>Price</th>
          <th style={{ padding: "10px", borderBottom: "1px solid white" }}>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item, index) => (
          <tr key={index}>
            <td style={{ padding: "10px", borderBottom: "1px solid white" }}>{item.Name}</td>
            <td style={{ padding: "10px", borderBottom: "1px solid white" }}>{item.Quantity}</td>
            <td style={{ padding: "10px", borderBottom: "1px solid white" }}>{item.Price}</td>
            <td style={{ padding: "10px", borderBottom: "1px solid white" }}>{item.TotalPrice}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <button
    style={{
      padding: '10px 20px',
      fontSize: '16px',
      marginTop: '20px',
      backgroundColor: 'lightblue',
      color: 'black',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    }}
    onClick={handleCheckOut}
  >
    Check Out
  </button>
</div>
      
      </>
 
      ) : (
        <div>
        <div style={{  textAlign : "center"}}>
        <div style={{display : "flex", flexWrap : "wrap", justifyContent : "center", textAlign : "center"}}>
        {cardsData.slice(0, 4).map((card, index) => (
          <Card key={index} imageUrl={card.imageUrl} description={card.description} onCardClick={handleCardClick} />
        ))}
      </div>
      <div style={{display : "flex",  justifyContent : "center", textAlign : "center"}}>
      {cardsData.slice( 4).map((card, index) => (
        <Card key={index} imageUrl={card.imageUrl} description={card.description} onCardClick={handleCardClick} />
      ))}
    </div>
    <br/>
    <button style = {{padding: '10px 20px', 
    fontSize: '16px' }}onClick={() => setShowCart(true) }>View Cart</button>
    </div>

    {showDialogCart && (
        <div style={modalStyle} >
          <h2>Order Details</h2>
          <p>Item Selected: {productName}</p>
          <p>Price: {productDetails[0].Price}</p>
          <label>Quantity:</label>
          <input type="number" value={quantity}  onChange={(e) => setQuantity(e.target.value)} />

          <button onClick={handleAddingToCart}>Add to Cart</button>
        </div>
      )}
      
    </div>
      )}
       </div>  
   
  );
};

export default Shop;
