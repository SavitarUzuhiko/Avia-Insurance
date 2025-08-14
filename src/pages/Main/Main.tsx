import type { RootState } from '@/app/store';
import { Heading } from '@/constants';
import { useSelector } from 'react-redux';
import { Contract, FormDate } from './components';
import { DataTravellers } from './components/Data_Travellers';
import { FormProvider, useForm, useFieldArray } from 'react-hook-form';
import { useEffect } from 'react';

type Traveller = {
  firstName: string;
  lastName: string;
  birthDate: Date | null;
};

type FormValues = {
  buyerIndex: number;
  travellers: Traveller[];
};

export const Main = () => {
  const travellers = useSelector((state: RootState) => state.travelers.data);

  const methods = useForm<FormValues>({
    defaultValues: {
      buyerIndex: 0,
      travellers: travellers.map((t) => ({
        firstName: t.firstName || '',
        lastName: t.lastName || '',
        birthDate: t.birthDate ? new Date(t.birthDate) : null,
      })),
    },
    mode: 'onSubmit',
  });
  const { control, handleSubmit, watch, reset } = methods;

  // Reset faqat travellers array o'zgarganda
  useEffect(() => {
    reset({
      buyerIndex: 0,
      travellers: travellers.map((t) => ({
        firstName: t.firstName || '',
        lastName: t.lastName || '',
        birthDate: t.birthDate ? new Date(t.birthDate) : null,
      })),
    });
  }, [travellers, reset]);

  console.log(travellers.length)

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'travellers',
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
  };

  const { language } = useSelector((state: RootState) => state.aviaslice);
  const heading = Heading.find((h) => h.lang === language);
  const buyerIndex = watch('buyerIndex');

  return (
    <div className='pb-20'>
      <h2 className='text-white text-3xl text-center mx-auto font-bold max-w-[290px] my-3'>
        {heading?.title}
      </h2>

      <FormDate />

      {travellers.length > 0 && (
        <>
          <Contract />
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-10 my-10'
            >
              {fields.map((_, index) => (
                <DataTravellers
                  remove={remove}
                  key={fields[index].id}
                  num={index + 1}
                  index={index}
                  isBuyer={buyerIndex === index}
                />
              ))}

              <div className='flex gap-3'>
                <button
                  type='button'
                  onClick={() =>
                    append({ firstName: '', lastName: '', birthDate: null })
                  }
                  className='rounded-lg bg-[#0063bb] text-white py-4 text-[16px] font-bold w-full'
                >
                  Add traveler
                </button>

                <button
                  type='submit'
                  className='rounded-lg bg-green-600 text-white py-4 text-[16px] font-bold w-full'
                >
                  Submit
                </button>
              </div>
            </form>
          </FormProvider>
        </>
      )}

      <div className='text-gray-500 text-sm flex flex-col items-center my-4 leading-6'>
        <span>
          I am familiar with the{' '}
          <a href='#' className='underline'>
            User Agreement, offer
          </a>{' '}
        </span>
        <a href='#' className='underline'>
          agreement and I
        </a>
        <a href='#' className='underline'>
          consent to the processing of personal data
        </a>
      </div>
    </div>
  );
};
