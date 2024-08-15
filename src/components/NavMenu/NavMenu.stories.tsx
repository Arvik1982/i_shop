import type { Meta, StoryObj } from "@storybook/react";
import { Dispatch, SetStateAction } from "react";
import { BrowserRouter } from "react-router-dom";
import NavMenu from "./NavMenu";
import { Provider } from "react-redux";
import store from "../../store";

const meta = {
  title: "Molecules/NavMenu",
  component: NavMenu,
} satisfies Meta<typeof NavMenu>;

export default meta;

type Story = StoryObj<typeof meta>;
const mockSetLink: Dispatch<SetStateAction<string>> = (value) => {
  console.log("Link set to:", value);
};
export const Default: Story = {
  render: (args) => (
    <Provider store={store}>
      <BrowserRouter>
      <NavMenu {...args} />
      </BrowserRouter>
    </Provider>
  ),
  args: {
    menuArr: ["Catalog", "FAQ", "Cart", "Johnson Smith"],
    setLink: mockSetLink,
  },
};
