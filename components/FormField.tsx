import React from 'react';

function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  as = 'input',
  options = [],
}: FormFieldProps) {
  function InputToRender({ type }: { type: string }) {
    if (type === 'textarea')
      return (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      );
    else if (type === 'select')
      return (
        <select id={id} name={id} value={value} onChange={onChange}>
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      );
    else
      return (
        <input
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      );
  }

  return (
    <div className='form-field'>
      FormField
      <label htmlFor='id'>{label}</label>
      <InputToRender type={as} />
    </div>
  );
}

export default FormField;
