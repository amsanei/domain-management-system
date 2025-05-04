import { Tooltip } from "antd";

export default function StatusIndicator({ isActive }: { isActive: boolean }) {
  if (isActive)
    return (
      <Tooltip title="Active">
        <span className="relative flex size-2">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full
                bg-green-400 opacity-75"
          ></span>
          <span className="relative inline-flex size-2 rounded-full bg-green-400"></span>
        </span>
      </Tooltip>
    );
  return (
    <Tooltip title="Not Active">
      <span className="size-2 bg-neutral-400 rounded-full"></span>
    </Tooltip>
  );
}
