/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Meta, StoryObj } from "@storybook/react-vite";
import DarkTooltip from "./DarkTooltip";

const meta: Meta<typeof DarkTooltip> = {
  title: "Tooltip/DarkTooltip",
  component: DarkTooltip,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DarkTooltip>;

export const DarkTooltips: Story = {
  args: {
    //@ts-expect-error
    title: "Tooltip text, : ) Have a nice day!!",
    children: (
      <div className="w-96 bg-blue-600 text-yellow-50 rounded-md text-center font-medium p-2">
        Hover Me
      </div>
    ),
    arrow: true,
    placement: "top",
  },
};
