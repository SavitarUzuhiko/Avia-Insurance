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
  days_translate:string
};

export const DateSelector = ({ name, title, form, beginDate, days_translate }: Props) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const selectedDays =
          field.value instanceof Date
            ? String(
                Math.round(
                  (field.value.getTime() - beginDate.getTime()) / (1000 * 60 * 60 * 24)
                )
              )
            : '';

        return (
          <FormItem>
            <FormLabel className="font-normal">{title}</FormLabel>
            <Select
              value={selectedDays}
              onValueChange={(value) => {
                const days = parseInt(value, 10);
                if (!isNaN(days) && !isNaN(beginDate.getTime())) {
                  const newDate = daysToDate(beginDate, days);
                  field.onChange(newDate);
                }
              }}
            >
              <FormControl>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Select a date" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="9">10 {days_translate}</SelectItem>
                <SelectItem value="14">15 {days_translate}</SelectItem>
                <SelectItem value="29">30 {days_translate}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
