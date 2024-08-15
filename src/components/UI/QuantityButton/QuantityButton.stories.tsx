import type { Meta, StoryObj } from "@storybook/react";
import QuantityButton from "./QuantityButton";
import { Dispatch, SetStateAction } from "react";

const meta: Meta<typeof QuantityButton> = {
  title: "Atoms/QuantityButton",
  component: QuantityButton,
};

export default meta;

type Story = StoryObj<typeof meta>;

const mockSetCount: Dispatch<SetStateAction<number>> = (value) => {
  if (typeof value === "function") {
    console.log("Count set to:", value(0));
  } else {
    console.log("Count set to:", value);
  }
};

export const Default: Story = {
  args: {
    count: 0,
    setCount: mockSetCount,
    action: "action",
  },
};
