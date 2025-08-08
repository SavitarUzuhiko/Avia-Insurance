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
import { useState, forwardRef } from 'react';
import { CalendarIcon } from "lucide-react"
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
  title: string;
  onOpen?: () => void;
};

export const DatePicker = forwardRef<HTMLButtonElement, Props>(
  ({ form, name, disabled, title, onOpen }, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-col rounded-lg py-1">
            <FormLabel className="font-normal">{title}</FormLabel>
            <Popover
              open={open}
              onOpenChange={(isOpen) => {
                setOpen(isOpen);
                if (isOpen && onOpen) onOpen();
              }}
            >
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    ref={ref}
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
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    setOpen(false);
                  }}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (disabled) return date < disabled;
                    return date < today;
                  }}
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

DatePicker.displayName = 'DatePicker';