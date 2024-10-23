import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AvatarDropdown } from "./AvatarDropdown";
import { StoreDecorator } from "@/6_shared/config/storybook/StoreDecorator/StoreDecorator";

export default {
  title: "4_features/AvatarDropdown",
  component: AvatarDropdown,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => <AvatarDropdown {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
// TODO
