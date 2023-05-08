import type {Checkout, Field} from "../../types";

import {Alert} from "~/ui/components/feedback/alert";
import {Input} from "~/ui/components/form/input";
import {RadioGroup, RadioGroupItem} from "~/ui/components/form/radio-group";
import {Label} from "~/ui/components/form/label";

function TextField({
  value,
  onChange,
  ...props
}: Omit<React.ComponentProps<typeof Input>, "onChange"> & {
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
    <RadioGroup value={value} onValueChange={onChange}>
      <div className="flex flex-col gap-4">
        {options.map((option) => (
          <div key={option} className="flex items-center gap-x-3">
            <RadioGroupItem id={option} value={option}>
              {option}
            </RadioGroupItem>
            <Label htmlFor={option}>{option}</Label>
          </div>
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
    <div className="flex flex-col gap-8">
      {fields.map((field) => (
        <div key={field.title} className="flex flex-col gap-4">
          <p className="text-lg font-medium">{field.title}</p>
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
            {field.note ? <Alert>{field.note}</Alert> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Fields;
