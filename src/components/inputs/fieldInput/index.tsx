"use client";

import { useState } from "react";
import { FieldsEnum } from "src/types/clientTypes";
import TextInput from "../textInput";
import { FaTrash, FaArrowDown, FaArrowUp } from "react-icons/fa";
import ImagesInput from "../imageInput";

const SelectedOption = ({
  selectedOption,
  id,
  onChange,
}: {
  selectedOption?: FieldsEnum;
  id: any;
  onChange: (e: any) => void;
}) => {
  //   const [value, setValue] = useState("");

  //   const onValueChange = (value: any) => {
  //     setValue(value);
  //   };

  if (!selectedOption) return <></>;
  if (
    [FieldsEnum.subtitle, FieldsEnum.text, FieldsEnum.title].includes(
      selectedOption
    )
  ) {
    return (
      <TextInput
        placeholder="Text"
        required
        onValueChange={(e) => onChange({ content: e })}
      />
    );
  }
  if (FieldsEnum.code === selectedOption) {
    return (
      <textarea
        id={`textarea-${id}`}
        name={`textarea-${id}`}
        required
        onChange={(e) =>
          onChange({
            content: e.target.value.split(/\r?\n|\r|\n/g).map((v) => `${v}`),
          })
        }
      ></textarea>
    );
  } else if (FieldsEnum.image === selectedOption) {
    return <ImagesInput />;
  }
  return <></>;
};

export interface FieldInputProps {
  id: string;
  isLastPosition: boolean;
  isFirstPosition: boolean;
  onValueChange: (value: any) => void;
  onTypeChange: (value: any) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export default function FieldInput(props: FieldInputProps) {
  const [selectedOption, setSelectedOption] = useState<FieldsEnum | undefined>(
    undefined
  );

  return (
    <div className="flex flex-col w-full gap-y-2">
      <div className="join">
        <select
          className="select join-item select-bordered w-full rounded-none text-stone-200 bg-stone-950 border hover:border-stone-500 border-stone-500 hover:bg-stone-900"
          onChange={(e) => {
            setSelectedOption(e.target.value as any);
            props.onTypeChange(e.target.value as any);
          }}
        >
          <option disabled selected>
            Field
          </option>
          <option value={FieldsEnum.title}>Title</option>
          <option value={FieldsEnum.subtitle}>Subtitle</option>
          <option value={FieldsEnum.divider}>Divider</option>
          <option value={FieldsEnum.code}>Code</option>
          <option value={FieldsEnum.image}>Image</option>
          <option value={FieldsEnum.text}>Text</option>
        </select>
        <button
          onClick={() => props.onDelete()}
          type="button"
          className="btn rounded-none join-item text-stone-200 bg-stone-950 border hover:border-stone-500 border-stone-500 hover:bg-stone-900"
        >
          <FaTrash />
        </button>
        {!props.isFirstPosition && (
          <button
            onClick={() => props.onMoveUp()}
            type="button"
            className="btn rounded-none join-item text-stone-200 bg-stone-950 border hover:border-stone-500 border-stone-500 hover:bg-stone-900"
          >
            <FaArrowUp />
          </button>
        )}
        {!props.isLastPosition && (
          <button
            onClick={() => props.onMoveDown()}
            type="button"
            className="btn rounded-none join-item text-stone-200 bg-stone-950 border hover:border-stone-500 border-stone-500 hover:bg-stone-900"
          >
            <FaArrowDown />
          </button>
        )}
      </div>
      <SelectedOption
        selectedOption={selectedOption}
        id={props.id}
        onChange={props.onValueChange}
      />
    </div>
  );
}
