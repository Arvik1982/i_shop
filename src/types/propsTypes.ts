import { Dispatch, SetStateAction } from "react";

export type TPropsLink = {
  link?: string;
  setLink: Dispatch<SetStateAction<string>>;
};
