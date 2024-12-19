import React from "react";

const Input = ({
  value,
  onChange,
  style,
  type,
  placeholder,
  readonly,
  name,
}) => {
  return (
    <input
      className={style}
      type={type}
      placeholder={placeholder ? placeholder : null}
      value={value}
      onInput={onChange}
      readOnly={readonly ? readonly : null}
      name={name}
    />
  );
};

export default Input;
