import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '1_app/providers/ThemeProvider';
import { Sidebar } from './Sidebar';

export default {
  title: '3_widget/Sidebar',
  component: Sidebar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => (
  <Sidebar {...args} />
);

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
