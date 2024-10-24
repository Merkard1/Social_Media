import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Theme } from "@/1_app/providers/ThemeProvider";

import { ThemeDecorator } from "@/6_shared/config/storybook/ThemeDecorator/ThemeDecorator";

import { NotFoundPage } from "./NotFoundPage";

export default {
  title: "2_pages/NotFoundPage",
  component: NotFoundPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof NotFoundPage>;

const Template: ComponentStory<typeof NotFoundPage> = (args) => (
  <NotFoundPage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
