import React from "react";
import { useNavigate } from "react-router-dom";
import './App.css';
import setImage from "./resources/bg.jpeg";
export default function IntroductionScreen() {
  const navigate = useNavigate();
  const imgStyle = {
    justifyContent : "center",
    width: '50%', 
    height: 'auto'
  };

    return (
      <div style={{textAlign: "center", justifyContent : "center"}}> 
      <div>
        <h1 style={{color: "white", textAlign : "center"} }>Sustainable Packaging Hub</h1>
        <p id="notes-paragraph">
          Choose sustainable products to make a positive impact on the environment and society. 
          <br/>
          <em>Embrace a lifestyle that values both your well-being and the planet.</em> <br/>
          Each purchase is an opportunity to contribute to a more sustainable future.<br/>
          <strong>Join the movement towards conscious consumerism today!</strong><br/>
        </p>

      </div>
      <div>

      <img style={imgStyle}
      src={setImage} alt="Card" className="card-image" />
      <br/>
      
      <button style = {{padding: '10px 20px', 
    fontSize: '16px', justifyContent :"center", width : "30%"}}onClick={() => navigate('/shop')}>Explore</button>

      </div>
      </div>
    );
}