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

const FormSchema = z.object({
  first_date: z.date({ error: 'A date is required.' }),
  last_date: z.date({
    error: 'A date is required.',
  }),
});

export function FormDate() {
  const {day} = useSelector((state: RootState) => state.aviaslice);
  const dispatch = useDispatch();
  const [checked , setChecked] = useState(false);
  const firstDateRef = useRef<HTMLButtonElement | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  const firstDate = form.watch('first_date');
  const lastDate = form.watch('last_date');

  useEffect(() => {
    if (firstDate && lastDate) {
      const diffTime = lastDate.getTime() - firstDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      dispatch(setDays(diffDays.toString()));
    }
  }, [firstDate, lastDate]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-3 p-3 bg-white rounded-lg'
      >
        {/* first_date */}
        <DatePicker
          ref={firstDateRef}
          name='first_date'
          title='The first trip date:'
          form={form}
        />

        {!checked && (
          <DatePicker
          name='last_date'
          title='The last trip date:'
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
          Amount of days: <span className='text-red-500 font-bold'>{day}</span>
        </p>

        <div className='flex items-start gap-3'>
          <Checkbox id='toggle' checked={checked} onClick={() => setChecked(!checked && !!firstDate)} />
          <Label htmlFor='toggle'>Annual insurance policy</Label>
        </div>

        {checked && (
          <DateSelector name='last_date' beginDate={firstDate} title='Number of days in a year:' form={form} />
        )}

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
