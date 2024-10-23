import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ThemeDecorator } from "@/6_shared/config/storybook/ThemeDecorator/ThemeDecorator";

import { Theme } from "@/1_app/providers/ThemeProvider";

import Modal from "./Modal";

export default {
  title: "6_shared/Modal",
  component: Modal,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Modal_Dark = Template.bind({});
Modal_Dark.args = {
  isOpen: true,
  children:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem laborum ea reprehenderit incidunt nihil iure aspernatur, fugit pariatur molestias suscipit natus aliquid, ut, impedit ab dolores possimus architecto commodi. Veritatis?",
};
Modal_Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Modal_Light = Template.bind({});
Modal_Light.args = {
  isOpen: true,
  children:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem laborum ea reprehenderit incidunt nihil iure aspernatur, fugit pariatur molestias suscipit natus aliquid, ut, impedit ab dolores possimus architecto commodi. Veritatis?",
};
