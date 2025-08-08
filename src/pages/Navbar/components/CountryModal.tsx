import { setCountry } from '@/app/slices/AviaSlice';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea,
} from '@/components/ui';
import { Countries } from '@/constants';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  children: React.ReactNode;
  closePopover: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CountryModal({ children, closePopover }: Props) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const select = (name: string) => {
    dispatch(setCountry(name));
    setOpen(false);
    closePopover(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className='sm:max-w-[425px] p-6'>
          <DialogHeader>
            <DialogTitle className='text-left text-2xl'>
              Select your country
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <ScrollArea className='h-[300px]'>
            {Countries.map((country) => (
              <p
                className='text-lg py-1'
                onClick={() => select(country.name)}
                key={country.flag}
              >
                {country.name}
              </p>
            ))}
          </ScrollArea>
        </DialogContent>
      </form>
    </Dialog>
  );
}
