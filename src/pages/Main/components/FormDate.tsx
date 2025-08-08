import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { DatePicker } from './DatePicker';
import { useEffect, useState } from 'react';

const FormSchema = z.object({
  first_date: z.date({error: 'A date is required.',
  }),
  last_date: z.date({
    error: 'A date is required.',
  }),
});


export function FormDate() {
  const [days,setDays] = useState(0);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  const firstDate = form.watch('first_date');
  const lastDate = form.watch('last_date');


  useEffect(() => {
    if(firstDate && lastDate){
      const diffTime = lastDate.getTime() - firstDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setDays(diffDays);
    }
  },[lastDate])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-3 p-3 bg-white rounded-lg'
      >
        <DatePicker
          name={'first_date'}
          title={'The first trip date:'}
          form={form}
        />
        <DatePicker
          title={'The last trip date:'}
          name='last_date'
          disabled={firstDate || null}
          form={form}
        />

        <p>Amount of days: <span className="text-red-500 font-bold">{days}</span></p>
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
