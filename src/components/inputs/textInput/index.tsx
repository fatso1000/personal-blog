"use client";
import React, { HTMLAttributes, useEffect, useState } from "react";

export interface SearchInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

function TextInput(props: SearchInputProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (props.defaultValue) {
      setValue(props.defaultValue);
    }
  }, [props]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.onValueChange && props.onValueChange(e.target.value);
  };

  return (
    <input
      {...props}
      className="input rounded-none w-full join-item placeholder-stone-500 text-stone-200 bg-stone-950 border border-stone-500 hover:bg-stone-900"
      defaultValue={props.defaultValue}
      onChange={onChange}
    />
  );
}

export default TextInput;
