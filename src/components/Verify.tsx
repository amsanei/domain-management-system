import { CheckSquareOutlined } from "@ant-design/icons";
import { useUpdateDomainMutation } from "../state/domains/domainsApiSlice";
import { useEffect, useState } from "react";
import useCreateNotification from "../hooks/useCreateNotification";
import { Button, Modal, Typography } from "antd";

export default function Verify({
  domainId,
  domain,
  callBack,
}: {
  domainId: number;
  domain: string;
  callBack: () => void;
}) {
  const [updateDomain, { isSuccess, isLoading, isError }] =
    useUpdateDomainMutation({});
  const { notify, contextHolder } = useCreateNotification();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      notify({
        type: "success",
        message: "Success!",
        description:
          "The domain " + domain + " has been successfully verified.",
      });
      setShowConfirmModal(false);
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
      setShowConfirmModal(false);
    }
  }, [isError]);
  const verifyDomain = () => {
    updateDomain({ domainId: domainId, newData: { status: "verified" } });
  };
  return (
    <>
      {contextHolder}
      <Modal
        title="Confirm Verification"
        open={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        footer={[
          <Button onClick={() => setShowConfirmModal(false)}>Cancel</Button>,
          <Button
            variant="solid"
            color="green"
            loading={isLoading}
            onClick={() => verifyDomain()}
          >
            Yes, Verify
          </Button>,
        ]}
      >
        <Typography.Text>
          Are you sure you want to verifiy the domain
          <Typography.Text code>{domain}</Typography.Text>?
        </Typography.Text>
      </Modal>
      <button
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setShowConfirmModal(true)}
      >
        <CheckSquareOutlined />
        <span>Verify</span>
      </button>
    </>
  );
}
