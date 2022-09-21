import React from "react";
import TextField from "@mui/material/TextField";
import { NumericFormat } from "react-number-format";
import { InputAttributes } from "react-number-format/types/types";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const NumberFormatCustom = React.forwardRef<
  NumericFormatProps<InputAttributes>,
  CustomProps
>(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        console.log(values);
        onChange({
          target: {
            name: props.name,
            value: values.formattedValue,
          },
        });
      }}
      thousandSeparator=" "
      suffix=" kr"
    />
  );
});

export function FormattedInput({ value }: { value: string }) {
  const [value2, setValue2] = React.useState<string>(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue2(event.target.value);
  };

  return (
    <TextField
      label="Lån"
      value={value2}
      onChange={handleChange}
      name="numberformat"
      id="formatted-numberformat-input"
      InputProps={{
        inputComponent: NumberFormatCustom as any,
      }}
      variant="standard"
    />
  );
}
