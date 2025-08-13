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

      <p className='text-gray-500 text-sm flex flex-col items-center my-10 leading-6'>
        <span>
          I am familiar with the <a href='#' className='underline'>User Agreement, offer</a>{' '}
        </span>
        <a href='#' className='underline'>agreement and I</a>
        <a href='#' className='underline'>consent to the processing of personal data</a>
      </p>
    </div>
  );
};
