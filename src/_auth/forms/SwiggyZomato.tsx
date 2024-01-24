// SwiggyZomato.js
const SwiggyZomato = () => {
  
  // Define the onClick handler functions
  const handleSwiggyClick = () => {
    alert('Integrate with Swiggy button clicked');
  };

  const handleZomatoClick = () => {
    alert('Integrate with Zomato button clicked');
  };

  return (
    <div className="custom-container flex-center flex-col">
      <img src="/assets/images/logo.png" alt="logo" className="min-w-30 h-auto pt-4 mt-4 mb-8" />
      <h2 className="mb-10 h3-bold md:h4-bold">Integrate with Swiggy/Zomato</h2>
      <div className="grid grid-cols-2 sd:grid-cols-1 gap-4">
        <button
          className="common-button shad-button_swiggy flex items-center justify-center"
          onClick={handleSwiggyClick} // Add the onClick handler here
        >
          <span className="text-wrap">Integrate with Swiggy</span>
          <img src="/assets/images/swiggy.svg" alt="Swiggy" className="w-20 h-auto pt-4" />
        </button>
        <button
          className="common-button shad-button_zomato flex items-center justify-center"
          onClick={handleZomatoClick} // Add the onClick handler here
        >
          <span className="text-wrap">Integrate with Zomato</span>
          <img src="/assets/images/zomato.webp" alt="Zomato" className="w-40 h-auto" />
        </button>
      </div>
    </div>
  );
};

export default SwiggyZomato;
