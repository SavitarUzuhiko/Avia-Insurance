import {
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Checkbox,
} from '@/components/ui';
import { Calendar } from '@/components/ui/calendar';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Info, CalendarIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type Props = {
  num: number;
  index: number;
  isBuyer: boolean;
};

export const DataTravellers = ({ num, index, isBuyer }: Props) => {
  const { register, control, setValue } = useFormContext();

  return (
    <div className='shadow-[0_2px_5px_3px_rgba(0,0,0,0.2)] rounded-lg p-4'>
      <h3 className='font-bold text-[17px]'>Data for traveler {num}</h3>

      <div className='flex items-center gap-2 my-4'>
        <p className='font-semibold text-gray-400 text-sm'>
          Why don't you need a passport for registration?
        </p>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type='button'
              aria-label='Information'
              className='p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0063bb]'
            >
              <Info className='w-5 h-5 text-[#0063bb]' />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align='start'
            sideOffset={8}
            className='max-w-[250px] text-sm leading-snug'
          >
            <p>
              Passport is not required because registration uses national ID
              instead.
            </p>
          </PopoverContent>
        </Popover>
      </div>

      <div className='space-y-4'>
        {/* First name */}
        <div>
          <Label
            htmlFor={`travellers.${index}.firstName`}
            className='text-md'
          >
            First name
          </Label>
          <Input
            id={`travellers.${index}.firstName`}
            type='text'
            className='bg-slate-100 border-0'
            {...register(`travellers.${index}.firstName`)}
          />
        </div>

        {/* Last name */}
        <div>
          <Label htmlFor={`travellers.${index}.lastName`} className='text-md'>
            Last name
          </Label>
          <Input
            id={`travellers.${index}.lastName`}
            type='text'
            className='bg-slate-100 border-0'
            {...register(`travellers.${index}.lastName`)}
          />
        </div>

        {/* Birth date picker */}
        <FormField
          control={control}
          name={`travellers.${index}.birthDate`}
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel className='text-md'>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      className={cn(
                        ' pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'dd-MM-yyyy')
                      ) : (
                        <span className='text-[15px]'>dd-mm-yyyy</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    captionLayout='dropdown'
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Buyer checkbox */}
        <div className='flex items-center gap-3'>
          <Checkbox
            id={`buyer-${index}`}
            checked={isBuyer}
            onCheckedChange={(checked) => {
              if (checked) setValue("buyerIndex", index);
            }}
            className='data-[state=checked]:bg-[#0063bb] border-gray-500'
          />
          <Label htmlFor={`buyer-${index}`} className='text-md'>
            The traveler is the buyer
          </Label>
        </div>
      </div>
    </div>
  );
};
