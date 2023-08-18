import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';

const HomePage : React.FC = () => {
  return (
    <div className="w-full">
      <div className="fixed top-0 left-0 w-full">
        <Navbar />
      </div>
    </div>
  )
}

export default HomePage;