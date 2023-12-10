import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');


  const handleClientLogin = () => {
    console.log("user name is", userName);
    navigate(`/user/${userName}`);
  };
  return (
    <div style={containerStyle}>
      <h2>Login Form</h2>

      {/* Client Login */}
      <div style={loginSectionStyle}>
        <label style={labelStyle}>Name:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={inputStyle}
        />
        <label style={labelStyle}>Password:</label>
        <input
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleClientLogin} style={buttonStyle}>
          Login
        </button>
      </div>

      
    </div>
  );
};

// CSS Styles
// CSS Styles
const containerStyle = {
  textAlign: 'center',
  margin: '20px',
};

const loginSectionStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '20px',
  margin: '10px',
};

const labelStyle = {
  display: 'block',
  margin: '10px 0',
};

const inputStyle = {
  width: '60%',
  padding: '8px',
  margin: '8px 0',
  borderRadius: '4px',
  boxSizing: 'border-box',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '40%', // Adjusted button width to 40%
  display: 'block', // Make the button a block element
  margin: '10px auto', // Center the button by setting margin
};



export default LoginForm;

