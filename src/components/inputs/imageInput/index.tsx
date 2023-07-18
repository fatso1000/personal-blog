"use client";

import { useState } from "react";
import TextInput from "../textInput";

export default function ImagesInput() {
  const [values, setValues] = useState({
    src: "",
    alt: "",
    caption: undefined,
  });
  const [hasCaption, setHasCaption] = useState(false);
  const onChange = (name: string, value: any) => {};
  const onCaptionChange = () => {
    if (hasCaption) {
      setHasCaption(false);
      onChange("caption", undefined);
    } else {
      setHasCaption(true);
      onChange("caption", "");
    }
  };
  return (
    <div>
      <TextInput
        required
        placeholder="Image Src"
        onValueChange={(e) => onChange("src", e)}
      />
      <TextInput
        required
        placeholder="Image Alt"
        onValueChange={(e) => onChange("alt", e)}
      />
      <div>
        <input
          type="checkbox"
          placeholder="Has Caption?"
          onChange={onCaptionChange}
        />
        <label htmlFor="">Has Caption?</label>{" "}
        {hasCaption && (
          <TextInput
            required
            placeholder="Image Caption"
            onValueChange={(e) => onChange("caption", e)}
          />
        )}
      </div>
    </div>
  );
}
