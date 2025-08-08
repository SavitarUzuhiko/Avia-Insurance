import type { RootState } from '@/app/store';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import type { UseFormReturn } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { daysToDate } from '../hook';

type Props = {
  name: 'first_date' | 'last_date';
  title: string;
  form: UseFormReturn<
    { first_date: Date; last_date: Date },
    any,
    { first_date: Date; last_date: Date }
  >;
  beginDate: Date;
};

export const DateSelector = ({ name, title, form, beginDate }: Props) => {
  const { day } = useSelector((state: RootState) => state.aviaslice);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='font-normal'>{title}</FormLabel>
          <Select
            value={day}
            onValueChange={(value) => {
              const days = parseInt(value, 10) -1;
              if (
                !isNaN(days) &&
                beginDate instanceof Date &&
                !isNaN(beginDate.getTime())
              ) {
                const newDate = daysToDate(beginDate, days);
                field.onChange(newDate);
              }
            }}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder='Select a date' />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value='10'>10 days</SelectItem>
              <SelectItem value='15'>15 days</SelectItem>
              <SelectItem value='30'>30 days</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
