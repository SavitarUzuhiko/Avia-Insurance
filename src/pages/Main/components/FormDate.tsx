import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { DatePicker } from './DatePicker';
import { useEffect, useState, useRef } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui';
import { DateSelector } from './DateSelector';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { setDays } from '@/app/slices/AviaSlice';
import { FormTranslate } from '@/constants';
import { Travelers } from './Travelers';
import { toast, Toaster } from 'sonner';

const FormSchema = z.object({
  first_date: z.date({ error: 'A date is required.' }),
  last_date: z.date({
    error: 'A date is required.',
  }),
});

export function FormDate() {
  const { day, language, travelers } = useSelector(
    (state: RootState) => state.aviaslice
  );
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const firstDateRef = useRef<HTMLButtonElement | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const firstDate = form.watch('first_date');
  const lastDate = form.watch('last_date');

  useEffect(() => {
    if (firstDate && lastDate) {
      const diffTime = lastDate.getTime() - firstDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      dispatch(setDays(diffDays.toString()));
    }
  }, [firstDate, lastDate]);

  const translate = FormTranslate.find((item) => item.lang === language);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (!(travelers.length > 0)) {
      toast.error('Travelers is empty');
    }
    const submittedData = {
      ...data,
      travelers: travelers.map(
        (t, i) => 'Traveler-' + (i + 1) + ' : ' + t + ' years'
      ),
    };
    console.log(submittedData);
    toast.success('Form submitted successfully. Check your console.');
  };

  return (
    <Form {...form}>
      <Toaster position='top-center' />
      {translate && (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-3 p-3 bg-[#ffffff8d] rounded-lg'
        >
          {/* first_date */}
          <DatePicker
            ref={firstDateRef}
            name='first_date'
            title={translate.first}
            form={form}
          />

          {!checked && (
            <DatePicker
              name='last_date'
              title={translate.last}
              disabled={firstDate || undefined}
              form={form}
              onOpen={() => {
                if (!form.getValues('first_date') && firstDateRef.current) {
                  firstDateRef.current.click();
                }
              }}
            />
          )}

          <p>
            {translate.days_amount}{' '}
            <span className='text-red-500 font-bold'>{day}</span>
          </p>

          <div className='flex items-start gap-3'>
            <Checkbox
              id='toggle'
              className='bg-white'
              checked={checked}
              onClick={() => setChecked(!checked && !!firstDate)}
            />
            <Label htmlFor='toggle'>{translate.chechbox}</Label>
          </div>

          {checked && (
            <DateSelector
              name='last_date'
              beginDate={firstDate}
              title={translate.number_days}
              days_translate={translate.days}
              form={form}
            />
          )}

          <Travelers />

          <Button type='submit' className='w-full bg-gradient-to-b from-[#f04500] to-[#fdca01]'>Calculate</Button>
        </form>
      )}
    </Form>
  );
}
