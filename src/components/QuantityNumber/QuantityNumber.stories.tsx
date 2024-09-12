import type { Meta, StoryObj } from "@storybook/react";

import QuantityNumber from "./QuantityNumber";

const meta = {
  title: "Atoms/QuantityNumber",
  component: QuantityNumber,
} satisfies Meta<typeof QuantityNumber>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 0,
  },
};
