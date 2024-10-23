import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ThemeDecorator } from "@/6_shared/config/storybook/ThemeDecorator/ThemeDecorator";

import { Theme } from "@/1_app/providers/ThemeProvider";

import Text, { TextTheme } from "./Text";

export default {
  title: "6_shared/Text",
  component: Text,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Title",
  text: "Some random text",
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
  title: "Title",
};

export const OnlyText = Template.bind({});
OnlyText.args = {
  text: "Some random text",
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  title: "Title",
  text: "Some random text",
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
  title: "Title",
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
  text: "Some random text",
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ErrorLight = Template.bind({});
ErrorLight.args = {
  title: "Title",
  text: "Some random text",
  theme: TextTheme.ERROR,
};

export const ErrorDark = Template.bind({});
ErrorDark.args = {
  title: "Title",
  text: "Some random text",
  theme: TextTheme.ERROR,
};
ErrorDark.decorators = [ThemeDecorator(Theme.DARK)];
