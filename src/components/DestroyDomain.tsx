import { DeleteOutlined } from "@ant-design/icons";
import { useDestroyDomainMutation } from "../state/domains/domainsApiSlice";
import { useEffect } from "react";
import useCreateNotification from "../hooks/useCreateNotification";

export default function DestroyDomain({
  id,
  callBack,
}: {
  id: number;
  callBack: () => void;
}) {
  const [destroyDomain, { isSuccess }] = useDestroyDomainMutation();
  const { notify, contextHolder } = useCreateNotification();

  useEffect(() => {
    if (isSuccess) {
      notify({
        type: "success",
        message: "Success!",
        description: "Domain has successfuly deleted!",
      });
      callBack();
    }
  }, [isSuccess]);

  return (
    <>
      {contextHolder}
      <button
        onClick={() => destroyDomain(id)}
        className="flex gap-2 items-center cursor-pointer"
      >
        <DeleteOutlined />
        <span>Delete</span>
      </button>
    </>
  );
}
