import logo from '@/assets/Vector.png';
import { MapPin, Phone } from 'lucide-react';
import { MultiLanguage , PopoverLocation} from './components';

export const Navbar = () => {
  return (
    <nav className='bg-[#055087] text-white flex justify-between items-center px-4 max-w-screen'>
      <div className='flex items-center gap-2'>
        <img src={logo} alt='Vercel Logo' width={80} height={'auto'} />
        <p className='flex justify-between'>
          <MapPin />
          <PopoverLocation />
        </p>
      </div>
      <div className='flex items-center gap-2'>
        <p className='bg-[#ffffff2f] p-2 rounded-full border-[1.5px] border-[#ffffff2f]'>
          <Phone className='w-5 h-5' />
        </p>
        <MultiLanguage />
      </div>
    </nav>
  );
};
