import { Button, Drawer, FormProps } from "antd";
import useCreateNotification from "../hooks/useCreateNotification";
import DomainForm from "./DomainForm";
import { useCreateDomainMutation } from "../state/domains/domainsApiSlice";
import { useEffect, useState } from "react";

export default function CreateDomain({ callBack }: { callBack: () => void }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { notify, contextHolder } = useCreateNotification();
  const [createDomain, { isSuccess, isLoading }] = useCreateDomainMutation();

  type FieldType = {
    domain: string;
    isActive: boolean;
    status: string;
  };

  useEffect(() => {
    if (isSuccess) {
      notify({
        type: "success",
        message: "Success!",
        description: "You created a new Domain.",
      });
      callBack();
      setIsDrawerOpen(false);
    }
  }, [isSuccess]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    createDomain(values);
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={() => setIsDrawerOpen(true)}>
        Add Domain
      </Button>
      <Drawer
        title="Add domain"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      >
        <DomainForm isPending={isLoading} onFinish={onFinish} />
      </Drawer>
    </>
  );
}
