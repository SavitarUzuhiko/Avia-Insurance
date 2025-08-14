import type { RootState } from '@/app/store';
import logo from '@/assets/Vector.png';
import { FormTranslate } from '@/constants';
import { useSelector } from 'react-redux';
import { Check, ChevronDown, Info } from 'lucide-react';
import { useState } from 'react';
import { Checkbox, Label, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';

export const Contract = () => {
  const { language } = useSelector((state: RootState) => state.aviaslice);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(69);
  const translate = FormTranslate.find((item) => item.lang === language);
  return (
    <>
      <h2 className='text-center text-[26px] font-extrabold max-w-[290px] mx-auto leading-7 mt-10 mb-4'>
        {translate?.Your_contract}
      </h2>
      <div className='shadow-[0_2px_5px_3px_rgba(0,0,0,0.2)] rounded-lg p-4'>
        <div className='flex justify-between items-center gap-4'>
          <p className='font-bold'>{translate?.insurance_policy}</p>
          <p className='text-[12px] text-right font-semibold'>
            {translate?.partnership}
          </p>
          <img src={logo} alt='' />
        </div>

        <div className='border-[1px] border-gray-300 p-2 rounded-md my-2'>
          {translate?.insurance_coverage}{' '}
          <span className='font-bold text-[#0063bb] text-lg ml-2'>
            35,000 €
          </span>
        </div>

        <div className='space-y-2'>
          {translate?.services.map((item, idx) => (
            <span
              key={idx}
              className={`inline-flex items-center gap-1 p-2 bg-slate-100 text-[13px] font-semibold w-max rounded-md not-[odd]:mr-1.5  ${!showAll && '[&:nth-child(5),&:nth-child(6)]:hidden'}`}
            >
              <Check className='w-5 h-5 inline' />
              {item}
            </span>
          ))}
          {!showAll && (
            <button
              className='flex items-center gap-1 bg-[#0063bb] text-white text-[14px] font-semibold w-max rounded-xl p-1 px-5'
              onClick={() => setShowAll(true)}
            >
              {translate?.show_all} <ChevronDown />
            </button>
          )}
        </div>

        <div className='bg-slate-100 rounded-lg p-5 text-center mt-4'>
          <p className='font-bold text-lg'>{translate?.cost_policy}</p>
          <p className='text-3xl font-bold mt-4'>{price}.00 €</p>
        </div>

        <div className='flex items-center gap-3 mt-4'>
          <Checkbox
            id='terms'
            onCheckedChange={() =>
              setPrice((prev) => {
                return prev === 69 ? 104 : 69;
              })
            }
            className='data-[state=checked]:bg-[#0063bb] border-gray-500'
          />
          <Label htmlFor='terms' className='text-md'>
            {translate?.activity}
          </Label>
          
          <Popover >
            <PopoverTrigger>
              <Info className='w-5 text-[#0063bb]' />
            </PopoverTrigger>
            <PopoverContent align='start' className='max-w-[250px] absolute bottom-10 '>
              <p>{translate?.activity_info}</p>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
};