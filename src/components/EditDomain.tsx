import { Drawer, FormProps } from "antd";
import DomainForm from "./DomainForm";
import { useEffect, useState } from "react";
import useCreateNotification from "../hooks/useCreateNotification";
type FieldType = {
  domain: string;
  isActive: boolean;
  status: string;
};
export default function EditDomain({
  isDrawerOpen,
  onDrawerClose,
  selectedDomain,
  refreshFn,
}: any) {
  const [isLoading, setIsLoading] = useState(false);

  const [info, setInfo] = useState(null);
  const { notify } = useCreateNotification();

  const getDomainInfo = async () => {
    setIsLoading(true);
    const res = await fetch(
      "https://6797aa2bc2c861de0c6d964c.mockapi.io/domain/" + selectedDomain
    );
    const data = await res.json();
    setIsLoading(false);
    setInfo(data);
  };

  useEffect(() => {
    getDomainInfo();
  }, [selectedDomain]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const res = await fetch(
      "https://6797aa2bc2c861de0c6d964c.mockapi.io/domain/" + selectedDomain,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain: values.domain,
          status: values.status,
          isActive: values.isActive,
        }),
      }
    );
    if (res.status === 200) {
      notify({
        type: "success",
        message: "Success!",
        description: "You edited it.",
      });
      refreshFn();
      onDrawerClose();
    }
  };

  if (selectedDomain)
    return (
      <Drawer title="Edit Domain" onClose={onDrawerClose} open={isDrawerOpen}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <DomainForm
            initialValues={info}
            onFinish={onFinish}
          />
        )}
      </Drawer>
    );
}
