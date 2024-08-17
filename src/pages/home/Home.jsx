import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';
import Arrow from '../../assets/icons/Arrow';
import bear from '../../assets/images/bear.png'
import coin from '../../assets/images/coin.png'
import trophy from '../../assets/images/trophy.png'
import rocket from '../../assets/images/rocket.png'
import joncoin from '../../assets/images/jon2.png'
import highVoltage from '../../assets/images/high-Voltage.png'


const Home = () => {

  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [clicks, setClicks] = useState([]);
  const pointsToAdd = 1;
  const energyToReduce = 1;

  console.log(points);
  console.log(energy);

  

  const handleClick = (e) => {
    if (energy - energyToReduce < 0) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 1000));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (

    <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">

  <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
  <div className="absolute inset-0 flex items-center justify-center z-0">
    <div className="radial-gradient-overlay"></div>
  </div>

  <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">

    <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
      <div className="w-full cursor-pointer">
        <div className="bg-[#fff] text-center py-2 rounded-full">
          <p className="text-lg font-bold text-black">Community</p>
        </div>
      </div>
      <div className="mt-5 text-4xl md:text-5xl font-bold flex items-center">
        <img src={coin} width={44} height={44} />
        <span className="ml-2">{points.toLocaleString()}</span>
      </div>
      <div className="text-sm md:text-base mt-2 flex items-center">
        <img src={trophy} width={24} height={24} />
        <span className="ml-1">Gold <Arrow size={18} className="ml-0 mb-1 inline-block" /></span>
      </div>
    </div>
    <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
  <div className="w-full flex flex-row md:flex-row justify-between gap-2">
    <div className="w-full md:w-1/3 flex items-center justify-start max-w-[8rem]">
      <div className="flex items-center justify-center">
        <img src={highVoltage} width={44} height={44} alt="High Voltage" />
        <div className="ml-2 text-left">
          <span className="text-white text-2xl font-bold block">{energy}</span>
          <span className="text-white text-lg opacity-75">/ 1000</span>
        </div>
      </div>
    </div>
    <div className="flex-grow flex items-center max-w-[15rem] text-sm">
      <div className="w-full bg-white py-4 rounded-2xl flex justify-around text-black font-semibold">
        <Link to="/friends" className="flex flex-col items-center gap-1">
          <img src={bear} width={24} height={24} alt="Friends" />
          <span>Frens</span>
        </Link>
        <div className="h-12 w-[2px] bg-gray-600"></div>
        <Link to="/" className="flex flex-col items-center gap-1">
          <img src={coin} width={24} height={24} alt="Earn" />
          <span>Earn</span>
        </Link>
        <div className="h-12 w-[2px] bg-gray-600"></div>
        <Link to="/boost" className="flex flex-col items-center gap-1">
          <img src={rocket} width={24} height={24} alt="Boosts" />
          <span>Boosts</span>
        </Link>
      </div>
    </div>
  </div>
  <div className="w-full bg-white rounded-full mt-4">
    <div className="bg-gradient-to-r from-[#69daf7] to-[#69daf7] h-4 rounded-full" style={{ width: `${(energy / 1000) * 100}%` }}></div>
  </div>
</div>
    <div className="flex-grow flex items-center justify-center">
      <div className="relative mt-4" onClick={handleClick}>
        <img src={joncoin} width={256} height={256} alt="notcoin" />
        {clicks.map((click) => (
          <div
            key={click.id}
            className="absolute text-4xl md:text-5xl font-bold opacity-0"
            style={{
              top: `${click.y - 42}px`,
              left: `${click.x - 28}px`,
              animation: `float 1s ease-out`
            }}
            onAnimationEnd={() => handleAnimationEnd(click.id)}
          >
            1
          </div>
        ))}
      </div>
    </div>

  </div>
</div>

  );
};

export default Home;