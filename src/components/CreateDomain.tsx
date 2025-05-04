import { Drawer, FormProps } from "antd";
import useCreateNotification from "../hooks/useCreateNotification";
import DomainForm from "./DomainForm";
import { useCreateDomainMutation } from "../state/domains/domainsApiSlice";
import { useEffect } from "react";

export default function CreateDomain({
  isDrawerOpen,
  onDrawerClose,
  callBack,
}: any) {
  const { notify, contextHolder } = useCreateNotification();

  const [createDomain, { isSuccess }] = useCreateDomainMutation();

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
      onDrawerClose();
    }
  }, [isSuccess]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    createDomain(values);
  };

  return (
    <>
      {contextHolder}
      <Drawer title="Add domain" onClose={onDrawerClose} open={isDrawerOpen}>
        <DomainForm onFinish={onFinish} />
      </Drawer>
    </>
  );
}
