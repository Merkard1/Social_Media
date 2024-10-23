import { ComponentStory, ComponentMeta } from "@storybook/react";

import { DropdownDirection } from "../../styles/consts";

import { ListBox } from "./ListBox";

export default {
  title: "6_shared/ListBox",
  component: ListBox,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [
    (Story) => <div style={{ padding: 100 }}><Story /></div>,
  ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  value: "123",
  items: [
    { content: "1asfasfasf23", value: "123" },
    { content: "1asfasfasf21233", value: "1232" },
  ],
};

export const topLeft = Template.bind({});
topLeft.args = {
  direction: DropdownDirection.BL,
  value: "123",
  items: [
    { content: "1asfasfasf23", value: "123" },
    { content: "1asfasfasf21233", value: "1232" },
  ],
};

export const topRight = Template.bind({});
topRight.args = {
  direction: DropdownDirection.BR,
  value: "123",
  items: [
    { content: "1asfasfasf23", value: "123" },
    { content: "1asfasfasf21233", value: "1232" },
  ],
};

export const bottomLeft = Template.bind({});
bottomLeft.args = {
  direction: DropdownDirection.TL,
  value: "123",
  items: [
    { content: "1asfasfasf23", value: "123" },
    { content: "1asfasfasf21233", value: "1232" },
  ],
};

export const bottomRight = Template.bind({});
bottomRight.args = {
  direction: DropdownDirection.TR,
  value: "123",
  items: [
    { content: "1asfasfasf23", value: "123" },
    { content: "1asfasfasf21233", value: "1232" },
  ],
};
