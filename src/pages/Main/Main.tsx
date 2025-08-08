import type { RootState } from '@/app/store';
import { Heading } from '@/constants';
import { useSelector } from 'react-redux';
import { FormDate } from './components';

export const Main = () => {
  const { language } = useSelector((state: RootState) => state.aviaslice);
  const heading = Heading.find((h) => h.lang === language);
  return (
    <div>
      <h2 className='text-white text-3xl text-center mx-auto font-bold max-w-[290px] my-3'>
        {heading?.title}
      </h2>
      <FormDate />
    </div>
  );
};
