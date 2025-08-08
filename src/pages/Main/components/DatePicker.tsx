import {
  Button,
  Calendar,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import type { UseFormReturn } from 'react-hook-form';
import { format } from 'date-fns';
import { useState } from 'react';

type Props = {
  form: UseFormReturn<
    { first_date: Date; last_date: Date },
    any,
    {
      first_date: Date;
      last_date: Date;
    }
  >;
  name: 'first_date' | 'last_date';
  disabled?: Date;
  title:string;
};

export const DatePicker = ({ form, name, disabled , title}: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col bg-blue-500 rounded-lg p-3'>
          <FormLabel className='font-normal'>{title}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? (
                    format(field.value, 'dd.MM.yyyy')
                  ) : (
                    <span>dd.mm.yyyy</span>
                  )}
                  <span className='ml-auto'></span>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='center'>
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                  setOpen(false);
                }}
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  if (disabled) return date < disabled
                  return date < today;
                }}
                captionLayout='dropdown'
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
