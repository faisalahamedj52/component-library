/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Meta, StoryObj } from "@storybook/react-vite";
import LineGraph from "./Line";

const meta: Meta<typeof LineGraph> = {
  title: "Charts/Line",
  component: LineGraph,
  tags: ["autodocs"],
};

export default meta;

// 👇 Create a strongly typed story
type Story = StoryObj<typeof LineGraph>;

export const Line: Story = {
  args: {
    xAxisData: ["2025-06-06", "2025-06-07", "2025-06-09", "2025-06-10"],
    seriesData: [
      {
        name: "High",
        data: [171, 17, 171, 171],
        color: "#ec301f",
        //@ts-expect-error
        label: "High",
      },
    ],
  },
  decorators: [
    (Story) => {
      return (
        <div className="w-[600px]">
          <Story />
        </div>
      );
    },
  ],
};
