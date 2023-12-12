

import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams, useSearchParams } from 'react-router-dom';
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
  const { userName } = useParams();
  const navigate = useNavigate();

  // const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDetails, setProductDetails] = useState([]);
  const [showDialogCart, setShowDialogCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [transaction, setTransaction] = useState(false);
  // const [showOrder , setShowOrder] = useState(false);
  const [updateAvailableQuantity, setUpdateAvailableQuantity] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [emptyCart, setEmptyCart] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [updateTransactionTable, setUpdateTransactionTable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://54.162.181.8:8000/user/${userName}`);
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const result = await response.json();

  
        setUserDetails(result);
        console.log("userdetails", userDetails[0]);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("productName:", productName);

    if (productName === '') {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(`http://54.162.181.8:8000/prodDetails/${productName}`);
  
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
    };
    fetchData();
  }, [productName]);





  useEffect(() => {
    if(showCart === false) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://54.162.181.8:8000/selectedItems/`);
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const result = await response.json();
  
        setCartItems(result);
        setEmptyCart(false);
        console.log(cartItems);
        // setShowDialogCart(true);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [showCart]);

  useEffect(() => {
    if(emptyCart == false) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://54.162.181.8:8000/resetCart/`);
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const result = await response.json();
  
        setCartItems([]);
        console.log(cartItems);
        // setShowDialogCart(true);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [emptyCart]);
  

  

  useEffect(() => {
    if( updateAvailableQuantity === false)
      return;
    const updateItemAvailability = async () => {
      try {
        const updatePromises = cartItems.map(async (item) => {
          const { Name: product, Quantity: qty } = item;
  
          const response = await fetch('http://54.162.181.8:8000/updateAvailability', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              product,
              qty,
            }),
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const result = await response.json();
  
          if (result.success) {
            console.log(`Availability for ${product} updated successfully.`);
          } else {
            console.error(`Item ${product} not available or out of stock.`);
          }
        });
  
        // Wait for all update promises to complete
        await Promise.all(updatePromises);
      } catch (error) {
        console.error('Error updating availability:', error);
      }
    };
    setUpdateAvailableQuantity(false);
    // Call the function when the component mounts
    updateItemAvailability();
  }, [updateAvailableQuantity]);
  

  useEffect(() => {
    if(transaction === false) return;

    const updateTransaction = async () => {
      console.log('updatettransaction', productDetails[0]);
      let price = productDetails[0].Price;
      let totalPrice = quantity * price;
      try {
        const response = await fetch('http://54.162.181.8:8000/updateTransaction', {
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

        setTransaction(false);
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

  useEffect(() => {
    if(updateTransactionTable === false) return;
      
    const updateTable = async () => {
      let FN = userDetails[0].FirstName;
      let LN = userDetails[0].LastName
      try {
        const updatePromises = cartItems.map(async (item) => {
          const { Name: product, Quantity: qty, Price : cost, TotalPrice : tp } = item;
  
          const response = await fetch('http://54.162.181.8:8000/updateDB', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              FN,
              LN,
              product,
              qty,
              cost,
              tp
            }),
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const result = await response.json();
  
          if (result.success) {
            console.log(`Availability for ${product} updated successfully.`);
          } else {
            console.error(`Item ${product} not available or out of stock.`);
          }
        });
  
        // Wait for all update promises to complete
        await Promise.all(updatePromises);
      } catch (error) {
        console.error('Error updating availability:', error);
      }
    };
    setUpdateTransactionTable(false);
    // Call the function when the component mounts
    updateTable();
  }, [updateTransactionTable]);
  


 
  const handleCheckOut = () => {
    setShowCart(false);
    setUpdateAvailableQuantity(true);
    setEmptyCart(true);
    setUpdateTransactionTable(true);
    // navigate('/');

  }

  

  const handleCardClick = (selectedCard) => {
    // Add the selected card to the cart
    setProductName(selectedCard.description);
    // setCart((prevCart) => [...prevCart, selectedCard]);
  };

  const handleAddingToCart = () => {

    if(productDetails[0].Quantity < quantity){
      alert(` ${productName}, mentioned quantity is not available. Sorry for the inconvenience!   `);
      setShowDialogCart(false);
    }else {
      setShowDialogCart(false);
      // alert(`${productName} added to cart`);
      setTransaction(true);
    }
    
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

  let value = 0;

  if(showCart){cartItems.map((item, index) => (value = value + item.TotalPrice))}

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
    <h3 style={{ color: "white" }}> Total Price to be paid : {value} </h3>
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



