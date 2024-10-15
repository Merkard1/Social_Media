import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ArticleRecommendationsList } from "./ArticleRecommendationsList";

export default {
  title: "4_features/ArticleRecommendationsList",
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args: any) => <ArticleRecommendationsList {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
