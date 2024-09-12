import type { Meta, StoryObj } from "@storybook/react";

import AddProductQuantity from "./AddProductQuantity";

const meta = {
  title: "Molecules/AddProductQuantity",
  component: AddProductQuantity,
} satisfies Meta<typeof AddProductQuantity>;

export default meta;

type Story = StoryObj<typeof AddProductQuantity>;

export const Default: Story = {
  args: {
    productCount: 0,
  },
};
