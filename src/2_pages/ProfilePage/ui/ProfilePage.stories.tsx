import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ThemeDecorator } from "6_shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "1_app/providers/ThemeProvider";
import { StoreDecorator } from "6_shared/config/storybook/StoreDecorator/StoreDecorator";
import ProfilePage from "./ProfilePage";

export default {
  title: "2_pages/ProfilePage",
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => (
  // @ts-ignore
  <ProfilePage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
