import { Button, Drawer, FormProps } from "antd";
import { useEffect, useState } from "react";
import { useCreateDomainMutation } from "../../state/domains/domainsApiSlice";
import useCreateNotification from "../../hooks/useCreateNotification";
import DomainForm from "../../components/forms/DomainForm";
import { DomainFormFieldType } from "../../types";

export default function Create({ callBack }: { callBack: () => void }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { notify, contextHolder } = useCreateNotification();
  const [createDomain, { isSuccess, isLoading, isError }] =
    useCreateDomainMutation();

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

  useEffect(() => {
    if (isError) {
      notify({
        type: "error",
        message: "Error!",
        description: "Something went wrong! please try again later.",
      });
    }
  }, [isError]);

  const onFinish: FormProps<DomainFormFieldType>["onFinish"] = async (
    values
  ) => {
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
