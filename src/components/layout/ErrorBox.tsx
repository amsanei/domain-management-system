import { WarningOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";

export default function ErrorBox({
  text,
  action,
}: {
  text?: string;
  action: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <WarningOutlined
        style={{ fontSize: "48px", color: "red", opacity: ".4" }}
      />
      <Typography.Text strong style={{ fontSize: "20px" }}>
        {text || "Something Went Wrong!"}
      </Typography.Text>
      <Button onClick={action} type="primary" className="mt-4">
        Retray
      </Button>
    </div>
  );
}
