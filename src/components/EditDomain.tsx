import { Drawer, FormProps } from "antd";
import DomainForm from "./DomainForm";
import { useEffect, useState } from "react";
import useCreateNotification from "../hooks/useCreateNotification";
import {
  useGetDomainQuery,
  useUpdateDomainMutation,
} from "../state/domains/domainsApiSlice";
import { EditOutlined } from "@ant-design/icons";
type FieldType = {
  domain: string;
  isActive: boolean;
  status: string;
};
export default function EditDomain({ domainId, callBack }: any) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: info, isLoading } = useGetDomainQuery(domainId);
  const [updateDomain, { isSuccess: isUpdateSuccess }] =
    useUpdateDomainMutation({});

  const { notify, contextHolder } = useCreateNotification();

  useEffect(() => {
    if (isUpdateSuccess) {
      notify({
        type: "success",
        message: "Success!",
        description: "You edited it.",
      });
      setIsDrawerOpen(false);
      callBack();
    }
  }, [isUpdateSuccess]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    updateDomain({ domainId: domainId, newData: values });
  };

  if (domainId)
    return (
      <>
        {contextHolder}
        <button
          onClick={() => {
            setIsDrawerOpen(true);
          }}
          className="flex gap-2 items-center cursor-pointer"
        >
          <EditOutlined />
          <span>Edit</span>
        </button>
        <Drawer
          title="Edit Domain"
          onClose={() => setIsDrawerOpen(false)}
          open={isDrawerOpen}
        >
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <DomainForm initialValues={info} onFinish={onFinish} />
          )}
        </Drawer>
      </>
    );
}
