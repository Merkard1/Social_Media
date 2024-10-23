import { ComponentMeta, ComponentStory } from "@storybook/react";

import { StoreDecorator } from "@/6_shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/6_shared/config/storybook/ThemeDecorator/ThemeDecorator";

import MainPage from "./MainPage";

import { Theme } from "@/1_app/providers/ThemeProvider";

export default {
  title: "2_pages/MainPage",
  component: MainPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = (args: any) => (
  <MainPage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
