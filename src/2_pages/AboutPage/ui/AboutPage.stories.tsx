import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ThemeDecorator } from "6_shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "1_app/providers/ThemeProvider";
import AboutPage from "./AboutPage";

export default {
  title: "2_pages/AboutPage",
  component: AboutPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = (args) => (
  // @ts-ignore
  <AboutPage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
