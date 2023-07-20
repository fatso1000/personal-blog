"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface SearchInputProps {
  defaultValue?: string;
}

function SearchInput(props: SearchInputProps) {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (props.defaultValue) {
      setSearchValue(props.defaultValue);
    }
  }, [props]);

  const router = useRouter();

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    if (!searchValue || searchValue.length === 0) {
      throw new Error("error");
    }
    router.push(encodeURI("/blog?name=" + searchValue));
  };

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <form className="join w-full" name="search-form" onSubmit={onFormSubmit}>
      <input
        className="input rounded-none w-full join-item placeholder-stone-500 text-stone-200 bg-stone-950 border border-stone-500 hover:bg-stone-900"
        placeholder="Posts"
        name="posts"
        defaultValue={props.defaultValue}
        onChange={onValueChange}
        required
      />
      <button
        type="submit"
        className="btn rounded-none join-item text-stone-200 bg-stone-950 border hover:border-stone-500 border-stone-500 hover:bg-stone-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
}

export default SearchInput;
