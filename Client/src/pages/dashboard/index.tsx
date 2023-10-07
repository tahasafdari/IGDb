import React from 'react';

const Dashboard = (): React.JSX.Element => {
  return (
    <div 
      className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center p-8 bg-cover z-10"
      style={{ backgroundImage: 'url(https://source.unsplash.com/random?gaming)' }}
    >
      {/* Overlay with reduced opacity */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="text-2xl font-bold mb-2 text-white">Explore the best games</div>
        <div className="text-xl mb-4 text-white">IGDB</div>
        <div className="mb-4 text-white">Your additional text here</div>
        <button className="bg-transparent text-white border border-white py-2 px-4 mb-8 rounded hover:bg-opacity-10 hover:bg-white transition">
          Click Me
        </button>
        <div className="flex justify-between w-3/4 mt-16 space-x-4 ml-64"> {/* Adjusted with `ml-32` */}
          {/* Images for demo */}
          <img className="w-1/5 rounded border-white border" src='https://source.unsplash.com/random?gaming' alt="Game 1" />
          <img className="w-1/5 rounded border-white border" src='https://source.unsplash.com/random?gaming' alt="Game 2" />
          <img className="w-1/5 rounded border-white border" src='https://source.unsplash.com/random?gaming' alt="Game 3" />
          <img className="w-1/5 rounded border-white border" src='https://source.unsplash.com/random?gaming' alt="Game 4" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
