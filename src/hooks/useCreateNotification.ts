import { notification } from "antd";

export default function useCreateNotification() {
  const [api, contextHolder] = notification.useNotification();
  const notify = ({
    type = "info",
    message,
    description,
    duration = 3,
  }: {
    type?: "success" | "info" | "warning" | "error";
    message: string;
    description?: string;
    duration?: number;
  }) => {
    api[type]({
      message,
      description,
      duration,
    });
  };
  return { notify, contextHolder };
}
