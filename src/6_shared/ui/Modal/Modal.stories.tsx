import { ComponentMeta, ComponentStory } from '@storybook/react';
import Modal from './Modal';
import { Theme } from '1_app/providers/ThemeProvider';

export default {
  title: '6_shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Modal_Dark = Template.bind({});
Modal_Dark.args = {
  isOpen: true,
  theme: Theme.DARK,
  children:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem laborum ea reprehenderit incidunt nihil iure aspernatur, fugit pariatur molestias suscipit natus aliquid, ut, impedit ab dolores possimus architecto commodi. Veritatis?',
};

export const Modal_Ligth = Template.bind({});
Modal_Ligth.args = {
  isOpen: true,
  theme: Theme.LIGHT,
  children:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem laborum ea reprehenderit incidunt nihil iure aspernatur, fugit pariatur molestias suscipit natus aliquid, ut, impedit ab dolores possimus architecto commodi. Veritatis?',
};
