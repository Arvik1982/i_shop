import type { Meta, StoryObj } from '@storybook/react';

import CustomButton from './CustomButton';

const meta = {
  title: 'Atoms/CustomButton',
  component: CustomButton,
} satisfies Meta<typeof CustomButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};