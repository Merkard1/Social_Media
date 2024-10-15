import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StoreDecorator } from "6_shared/config/storybook/StoreDecorator/StoreDecorator";
import ArticlesPage from "./ArticlesPage";

export default {
  title: "2_pages/ArticlesPage/ArticlesPage",
  component: ArticlesPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = (args) => <ArticlesPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

Normal.decorators = [
  StoreDecorator({}),
];
