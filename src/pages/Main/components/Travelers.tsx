import type { RootState } from '@/app/store';
import { FormTranslate } from '@/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState, type ReactNode } from 'react';
import { ScrollArea } from '@/components/ui';
import { deleteTravelers, setTravelers } from '@/app/slices/AviaSlice';
import { X } from 'lucide-react';

type Props = {
  children: ReactNode;
  age_translate: string;
};

export const Travelers = () => {
  const { language, travelers } = useSelector(
    (state: RootState) => state.aviaslice
  );
  const translate = FormTranslate.find((item) => item.lang === language);
  return (
    <div className='my-4'>
      <label htmlFor='travelers'>
        {translate?.travelers} ({travelers.length}) :
      </label>
      {translate && (
        <Dropdown age_translate={translate.age}>
          <Button variant='outline' className='w-full'>
            <span className='mr-auto'>
              {travelers.length > 0 ? travelers.map(t => (t)).join(', ') + ' years' : 'Number of tourists'}
            </span>
          </Button>
        </Dropdown>
      )}
    </div>
  );
};

export function Dropdown({ children, age_translate }: Props) {
  const [open, setOpen] = useState(false);
  const { travelers } = useSelector((state: RootState) => state.aviaslice);
  const dispatch = useDispatch();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className='relative top-[-40px] left-[0px]'
        side='bottom'
        align='center'
        sideOffset={4}
      >
        <DropdownMenuLabel className='min-w-[295px]'>
          <span className='mr-auto'>
              {travelers.length > 0 ? travelers.map(t => (t)).join(', ') + ' years'  : 'Number of tourists'}
            </span>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {travelers.map((traveler, idx) => (
            <DropdownMenuItem
              key={idx}
              className='focus:bg-[#0080e3] bg-[#0091ff]  text-white mb-1 focus:text-white flex justify-between'
            >
              <span>
                {idx + 1} tourist : {traveler} years
              </span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('hello');
                  dispatch(deleteTravelers(idx));
                }}
              >
                <X className='text-white cursor-pointer' />
              </span>
            </DropdownMenuItem>
          ))}
          <PopoverTourist age_translate={age_translate}>
            <Button className='w-full bg-red-500 mt-2'>
              <span className='mr-auto'>+ Add a tourist</span>
            </Button>
          </PopoverTourist>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function PopoverTourist({
  children,
  age_translate,
}: {
  children: React.ReactNode;
  age_translate: string;
}) {
  const dispatch = useDispatch();
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className='w-24' align='end'>
        <ScrollArea className='h-40 text-right'>
          {Array.from({ length: 100 }, (_, index) => (
            <p key={index} onClick={() => dispatch(setTravelers(index + 1))}>
              {index + 1} {age_translate}
            </p>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
