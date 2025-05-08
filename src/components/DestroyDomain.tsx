import { DeleteOutlined, WarningOutlined } from "@ant-design/icons";
import { useDestroyDomainMutation } from "../state/domains/domainsApiSlice";
import { useEffect, useState } from "react";
import useCreateNotification from "../hooks/useCreateNotification";
import { Button, Modal, Typography } from "antd";

export default function DestroyDomain({
  id,
  domain,
  callBack,
}: {
  id: number;
  domain: string;
  callBack: () => void;
}) {
  const [destroyDomain, { isSuccess, isError, isLoading }] =
    useDestroyDomainMutation();
  const { notify, contextHolder } = useCreateNotification();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
      <Modal
        title={
          <div className="flex items-center gap-2">
            <WarningOutlined style={{ color: "red" }} />
            <span>Confirm Deletion</span>
          </div>
        }
        open={showConfirmModal}
        footer={[
          <Button danger loading={isLoading} onClick={() => destroyDomain(id)}>
            Yes, Delete
          </Button>,
          <Button type="primary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <Typography.Text>
          Are you sure you want to delete the domain{" "}
          <Typography.Text code>{domain}</Typography.Text>?
          <br />
          This action <strong>Permanent</strong> and <strong>Con't</strong> be
          undone.
        </Typography.Text>
      </Modal>
      <button
        onClick={() => setShowConfirmModal(true)}
        className="flex gap-2 items-center cursor-pointer"
      >
        <DeleteOutlined />
        <span>Delete</span>
      </button>
    </>
  );
}
