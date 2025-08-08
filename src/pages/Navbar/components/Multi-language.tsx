import { setLanguage } from '@/app/slices/AviaSlice';
import { type AppDispatch, type RootState } from '@/app/store';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select';
import { countries } from '@/constants';
import { useDispatch, useSelector } from 'react-redux';

export function MultiLanguage() {
  const { language } = useSelector((state: RootState) => state.aviaslice);

  const dispatch = useDispatch<AppDispatch>();

  const setCountryIcon = (value: string) => {
    const country = countries.find((c) => c.name === value) ?? countries[0];
    return (
      <img
        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.flag}.svg`}
        width={28}
        className='inline-block'
        alt={country.name}
      />
    );
  };

  return (
    <Select
      value={language}
      onValueChange={(value) => dispatch(setLanguage(value))}
    >
      <SelectTrigger className='w-[30px] border-none shadow-none focus-visible:ring-0 outline-none [&>svg]:hidden p-0 justify-center'>
        {setCountryIcon(language)}
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Countries</SelectLabel>
          {countries.map((country) => (
            <SelectItem key={country.name} value={country.name}>
              {setCountryIcon(country.name)} {country.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
