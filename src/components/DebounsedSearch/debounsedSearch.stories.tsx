import type { Meta, StoryObj } from "@storybook/react";
import DebounsedSearch from "./debounsedSearch";
import { Dispatch, SetStateAction } from "react";

const meta: Meta<typeof DebounsedSearch> = {
  title: "Atoms/DebounsedSearch",
  component: DebounsedSearch,
};

export default meta;

type Story = StoryObj<typeof meta>;

const mockSetSearchInput: Dispatch<SetStateAction<string>> = (value) => {
  if (typeof value === "function") {
    console.log("Search input set to:", value(""));
  } else {
    console.log("Search input set to:", value);
  }
};

export const Default: Story = {
  args: {
    setSearchInput: mockSetSearchInput,
  },
};
