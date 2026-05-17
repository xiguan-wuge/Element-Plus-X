import { default as WelcomeSource } from "../../components/Welcome/index.vue";
import { Meta, StoryObj } from "@storybook/vue3";
declare const meta: Meta<typeof WelcomeSource>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const WelcomeDemo: Story;
export declare const SlotDemo: Story;
