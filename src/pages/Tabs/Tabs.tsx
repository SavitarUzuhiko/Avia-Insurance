import { House, UserRound } from 'lucide-react';
import { Link } from 'react-router';

export const Tabs = () => {
  return (
    <div className='fixed bottom-0 w-full bg-white left-0 flex justify-around py-3'>
      <Link to={'/'} className='flex flex-col items-center'>
        <p>
          <House />
        </p>
        <p>Home</p>
      </Link>
      <div className='absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white shadow-xl'>
        <button className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-r from-[#0063bb] to-[#0b51da] rounded-full flex items-center justify-center'></button>
      </div>
      <Link to={'/profile'} className='flex flex-col items-center'>
        <p>
          <UserRound />
        </p>
        <p>Profile</p>
      </Link>
    </div>
  );
};