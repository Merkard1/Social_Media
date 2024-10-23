import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ThemeDecorator } from "@/6_shared/config/storybook/ThemeDecorator/ThemeDecorator";

import { Theme } from "@/1_app/providers/ThemeProvider";

import { ErrorPage } from "./ErrorPage";

export default {
  title: "3_widget/ErrorPage",
  component: ErrorPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ErrorPage>;

const Template: ComponentStory<typeof ErrorPage> = (args) => (
  <ErrorPage {...args} />
);

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
