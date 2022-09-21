import React from "react";

import { Button, Card, CardContent, TextField } from "@mui/material";
import Stack from "@mui/system/Stack/Stack";

import { NumericFormat } from "react-number-format";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      decimalScale={0}
    />
  );
}

export const CalculateForm = () => {
  const [loan, setLoan] = React.useState(4000000);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const x = event.target.value;
    setLoan(parseInt(x));
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <TextField
            label="Lån"
            value={loan.toFixed(2)}
            onChange={handleChange}
            name="loan"
            id="loan"
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
          />
          <Button variant="contained">Calculate</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
