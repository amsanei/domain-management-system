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
  const [destroyDomain, { isSuccess, isError }] = useDestroyDomainMutation();
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

  useEffect(() => {
    if (isError) {
      notify({
        type: "error",
        message: "Error!",
        description: "Something went wrong! please try again later.",
      });
    }
  }, [isError]);

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
