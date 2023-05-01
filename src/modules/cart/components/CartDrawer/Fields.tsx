import type {InputProps} from "@chakra-ui/react";
import type {Checkout, Field} from "../../types";

import {Input, Alert, RadioGroup, Radio} from "@chakra-ui/react";

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
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <Radio key={option} value={option}>
            {option}
          </Radio>
        ))}
      </div>
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
    <div className="flex flex-col gap-6">
      {fields.map((field) => (
        <div key={field.type} className="flex flex-col gap-2">
          <p className="font-medium">{field.title}</p>
          <div className="flex flex-col gap-4">
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
          </div>
        </div>
      ))}
    </div>
  );
}

export default Fields;
