import { ComponentStory, ComponentMeta } from "@storybook/react";

import AgeSelect from "./AgeSelect";

export default {
  title: "5_entities/AgeSelect",
  component: AgeSelect,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AgeSelect>;

const Template: ComponentStory<typeof AgeSelect> = (args) => <AgeSelect {...args} />;

export const Primary = Template.bind({});

Primary.args = {
};
