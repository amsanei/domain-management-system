import { Drawer, FormProps } from "antd";
import DomainForm from "./DomainForm";
import { useEffect } from "react";
import useCreateNotification from "../hooks/useCreateNotification";
import {
  useGetDomainQuery,
  useUpdateDomainMutation,
} from "../state/domains/domainsApiSlice";
type FieldType = {
  domain: string;
  isActive: boolean;
  status: string;
};
export default function EditDomain({
  isDrawerOpen,
  onDrawerClose,
  selectedDomain,
  callBack,
}: any) {
  const { data: info, isLoading } = useGetDomainQuery(selectedDomain);
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
      onDrawerClose();
      callBack();
    }
  }, [isUpdateSuccess]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    updateDomain({ domainId: selectedDomain, newData: values });
  };

  if (selectedDomain)
    return (
      <>
        {contextHolder}
        <Drawer title="Edit Domain" onClose={onDrawerClose} open={isDrawerOpen}>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <DomainForm initialValues={info} onFinish={onFinish} />
          )}
        </Drawer>
      </>
    );
}
