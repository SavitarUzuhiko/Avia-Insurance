import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select';
import { countries } from '@/constants';
import { useState } from 'react';

export function MultiLanguage() {

  const [selectedCountry, setSelectedCountry] = useState(countries[0].name);

  const setCountryIcon = (value: string) => {
    const country = countries.find((c) => c.name === value) ?? countries[0];
    return (
      <img
        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.flag}.svg`}
        width={28}
        className="inline-block"
        alt={country.name}
      />
    );
  };

  return (
    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
      <SelectTrigger className="w-[30px] border-none shadow-none focus-visible:ring-0 outline-none [&>svg]:hidden p-0 justify-center">
        {setCountryIcon(selectedCountry)}
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
