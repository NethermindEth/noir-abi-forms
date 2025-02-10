import type { Meta, StoryObj } from "@storybook/react";
import Label from ".";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    content: {
      control: "text",
      description: "The text content of the label",
    },
    className: {
      control: "select",
      options: [
        // Function Tags
        "bg-function-public-bg text-function-public-text",
        "bg-function-private-bg text-function-private-text",
        "bg-function-internal-bg text-function-internal-text",
        "bg-function-external-bg text-function-external-text",
        // Mutability Tags
        "bg-mutability-bg text-mutability-text",
        // Action Colors
        "bg-action-primary text-text-primary",
        "bg-action-danger text-text-primary",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "documentation",
  },
};

export const Bug: Story = {
  args: {
    content: "bug",
    className: "bg-function-private-bg text-function-private-text",
  },
};

export const Enhancement: Story = {
  args: {
    content: "enhancement",
    className: "bg-function-external-bg text-function-external-text",
  },
};

export const GoodFirstIssue: Story = {
  args: {
    content: "good first issue",
    className: "bg-function-public-bg text-function-public-text",
  },
};

export const Help: Story = {
  args: {
    content: "help wanted",
    className: "bg-mutability-bg text-mutability-text",
  },
};

export const Multiple: Story = {
  args: {
    content: "documentation",
  },
  decorators: [
    () => (
      <div className="flex gap-2 flex-wrap">
        <Label
          content="bug"
          className="bg-function-private-bg text-function-private-text"
        />
        <Label
          content="enhancement"
          className="bg-function-external-bg text-function-external-text"
        />
        <Label
          content="documentation"
          className="bg-function-internal-bg text-function-internal-text"
        />
        <Label
          content="good first issue"
          className="bg-function-public-bg text-function-public-text"
        />
        <Label
          content="help wanted"
          className="bg-mutability-bg text-mutability-text"
        />
        <Label
          content="in progress"
          className="bg-action-primary text-text-primary"
        />
      </div>
    ),
  ],
};
