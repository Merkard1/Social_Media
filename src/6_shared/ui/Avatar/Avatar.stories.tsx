import { ComponentStory, ComponentMeta } from "@storybook/react";
import img from "6_shared/assets/tests/avatar.png";

import Avatar from "./Avatar";

export default {
  title: "6_shared/Avatar",
  component: Avatar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  size: 150,
  src: img,
};
