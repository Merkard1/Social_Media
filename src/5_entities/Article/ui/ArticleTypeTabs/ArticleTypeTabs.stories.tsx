import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ArticleTypeTabs } from "./ArticleTypeTabs";

export default {
  title: "5_entities/Article/ArticleTypeTabs",
  component: ArticleTypeTabs,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ArticleTypeTabs>;

const Template: ComponentStory<typeof ArticleTypeTabs> = (args) => <ArticleTypeTabs {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
