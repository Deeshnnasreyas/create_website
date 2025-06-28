import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CountrySelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  withLanguage?: boolean;
  defaultCountry?: string;
  error?: string;
};

const countries = [
  { code: "AW", name: "Aruba" },
  { code: "AF", name: "Afghanistan" },
  { code: "AO", name: "Angola" },
  { code: "AI", name: "Anguilla" },
  { code: "AX", name: "Åland Islands" },
  { code: "AL", name: "Albania" },
  { code: "AD", name: "Andorra" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AS", name: "American Samoa" },
  { code: "AQ", name: "Antarctica" },
  { code: "TF", name: "French Southern Territories" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BI", name: "Burundi" },
  { code: "BE", name: "Belgium" },
  { code: "BJ", name: "Benin" },
  { code: "BQ", name: "Bonaire, Sint Eustatius and Saba" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BD", name: "Bangladesh" },
  { code: "BG", name: "Bulgaria" },
  { code: "BH", name: "Bahrain" },
  { code: "BS", name: "Bahamas" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BY", name: "Belarus" },
  { code: "BZ", name: "Belize" },
  { code: "BM", name: "Bermuda" },
  { code: "BO", name: "Bolivia" },
  { code: "BR", name: "Brazil" },
  { code: "BB", name: "Barbados" },
  { code: "BN", name: "Brunei Darussalam" },
  { code: "BT", name: "Bhutan" },
  { code: "BW", name: "Botswana" },
  { code: "CF", name: "Central African Republic" },
  { code: "CA", name: "Canada" },
  { code: "CH", name: "Switzerland" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" },
  { code: "CU", name: "Cuba" },
  { code: "DE", name: "Germany" },
  { code: "DK", name: "Denmark" },
  { code: "EG", name: "Egypt" },
  { code: "ES", name: "Spain" },
  { code: "FR", name: "France" },
  { code: "GB", name: "United Kingdom" },
  { code: "IN", name: "India" },
  { code: "IT", name: "Italy" },
  { code: "JP", name: "Japan" },
  { code: "MX", name: "Mexico" },
  { code: "NL", name: "Netherlands" },
  { code: "NG", name: "Nigeria" },
  { code: "PK", name: "Pakistan" },
  { code: "PL", name: "Poland" },
  { code: "RU", name: "Russia" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SE", name: "Sweden" },
  { code: "TR", name: "Turkey" },
  { code: "UA", name: "Ukraine" },
  { code: "US", name: "United States" },
  { code: "VN", name: "Vietnam" },
  { code: "ZA", name: "South Africa" },
];

export const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  withLanguage = false,
  error,
}) => {
  return (
    <div className="w-full space-y-1">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              <img
                src={`https://flagcdn.com/24x18/${country.code.toLowerCase()}.png`}
                alt={country.name}
                className="inline-block mr-2 w-[20px] h-[14px] rounded-sm object-cover"
              />
              {country.name} {withLanguage ? `(${country.code})` : ""}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
