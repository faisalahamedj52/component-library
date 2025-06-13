import type { Meta, StoryObj } from "@storybook/react-vite";
import { BarChart } from "./Bar";

const meta: Meta<typeof BarChart> = {
  title: "Charts/Bar",
  component: BarChart,
  tags: ["autodocs"],
};

export default meta;

// 👇 Create a strongly typed story
type Story = StoryObj<typeof BarChart>;

export const Bar: Story = {
  args: {
    widgetId: "Title of the Widget",
    xAxisData: ["GET"],
    seriesData: [
      { name: "Low", data: [237] },
      { name: "Informational", data: [113] },
      { name: "Medium", data: [15] },
    ],
    stacked: true,
    colors: ["#f4c644", "#4fc3f7", "#ee9135"],
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
