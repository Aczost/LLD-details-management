import React from 'react';

const Footer = () => {
  const footerStyle = {
    color: '#333',
    padding: '20px',
    textAlign: 'center',
  };

  const contentStyle = {
    fontSize: '14px',
  };

  return (
    <footer style={footerStyle}>
      <div className="footer-content" style={contentStyle}>
        <p>&copy; 2023 Link Laser Die</p>
      </div>
    </footer>
  );
};

export default Footer;
