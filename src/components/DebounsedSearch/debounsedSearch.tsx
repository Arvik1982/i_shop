import { useEffect, useState } from "react";
import styles from "./debouncedSearch.module.css";
import debounce from "lodash.debounce";

type TProps = {
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
};

export default function DebouncedSearch({ setSearchInput, setSkip }: TProps) {
  const [searchedText, setSearchedText] = useState("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchedText(event.target.value);
  };
  const debouncedSearch = debounce((text): void => {
    setSearchInput(text);
    setSkip(0);
  }, 300);

  useEffect(() => {
    debouncedSearch(searchedText);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchedText]);

  return (
    <label title="search" htmlFor="search">
      <input
        value={searchedText}
        onChange={handleInputChange}
        id="search"
        aria-label="Search by title"
        placeholder="Search by title"
        className={styles.search}
        type="search"
        autoComplete="on"
      />
    </label>
  );
}
