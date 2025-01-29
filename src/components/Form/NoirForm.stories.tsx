import type { Meta, StoryObj } from '@storybook/react';
import { NoirForm } from './index';
import SAMPLE_ABI from '../../assets/counter-Counter.json';
import { NoirCompiledContract } from '@aztec/types/noir';

const meta = {
  title: 'Components/NoirForm',
  component: NoirForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NoirForm>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Default: Story = {
  args: {
    abi: SAMPLE_ABI as unknown as NoirCompiledContract,
    skipValidation: true,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  },
};
