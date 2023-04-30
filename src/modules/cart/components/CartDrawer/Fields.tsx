import type {InputProps} from "@chakra-ui/react";
import type {Checkout, Field} from "../../types";

import {Stack, Text, Input, Alert, RadioGroup, Radio} from "@chakra-ui/react";

function TextField({
  value,
  onChange,
  ...props
}: Omit<InputProps, "onChange"> & {
  onChange: (value: string) => void;
}) {
  return <Input value={value} onChange={(e) => onChange(e.target.value)} {...props} />;
}

function RadioField({
  value,
  onChange,
  options,
}: {
  options: string[];
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <RadioGroup colorScheme="primary" value={value} onChange={onChange}>
      <Stack>
        {options.map((option) => (
          <Radio key={option} value={option}>
            {option}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
}

function Fields({
  fields,
  checkout,
  onChange,
}: {
  fields: Field[];
  checkout: Checkout;
  onChange: (id: string, value: string) => void;
}) {
  return (
    <Stack spacing={6}>
      {fields.map((field) => (
        <Stack key={field.type}>
          <Text fontWeight={500}>{field.title}</Text>
          <Stack spacing={4}>
            {field.type === "text" && (
              <TextField
                placeholder={field.placeholder}
                value={checkout.get(field.title) || ""}
                onChange={(value: string) => onChange(field.title, value)}
              />
            )}
            {field.type === "radio" && (
              <RadioField
                options={field.options}
                value={checkout.get(field.title) || ""}
                onChange={(value: string) => onChange(field.title, value)}
              />
            )}
            {field.note ? <Alert colorScheme="primary">{field.note}</Alert> : null}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}

export default Fields;
