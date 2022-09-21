import React from "react";

import { Button, Card, CardContent, TextField } from "@mui/material";
import Stack from "@mui/system/Stack/Stack";

import { NumericFormat } from "react-number-format";
import { FormattedInput } from "./TextFieldMoney";

export const CalculateForm = () => {
  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <FormattedInput value="4000000" />
          <Button variant="contained">Calculate</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
