import { Drawer, FormProps } from "antd";
import useCreateNotification from "../hooks/useCreateNotification";
import DomainForm from "./DomainForm";

export default function CreateDomain({
  isDrawerOpen,
  onDrawerClose,
  refreshFn,
}: any) {
  const { notify } = useCreateNotification();

  type FieldType = {
    domain: string;
    isActive: boolean;
    status: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const res = await fetch(
      "https://6797aa2bc2c861de0c6d964c.mockapi.io/domain",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          createdDate: Date.now(),
          domain: values.domain,
          status: values.status,
          isActive: values.isActive,
        }),
      }
    );
    if (res.status === 201) {
      notify({
        type: "success",
        message: "Success!",
        description: "You created a new Domain.",
      });
      refreshFn();
      onDrawerClose();
    }
  };

  return (
    <Drawer title="Add domain" onClose={onDrawerClose} open={isDrawerOpen}>
      <DomainForm onFinish={onFinish}/>
    </Drawer>
  );
}
