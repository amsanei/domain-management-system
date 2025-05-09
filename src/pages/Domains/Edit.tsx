import { Drawer, FormProps } from "antd";

import { useEffect, useState } from "react";
import useCreateNotification from "../../hooks/useCreateNotification";
import {
  useGetDomainQuery,
  useUpdateDomainMutation,
} from "../../state/domains/domainsApiSlice";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import ErrorBox from "../../components/layout/ErrorBox";
import DomainForm from "../../components/forms/DomainForm";
import { DomainFormFieldType } from "../../types";

export default function Edit({
  domainId,
  callBack,
}: {
  domainId: number;
  callBack: () => void;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {
    data: info,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetDomainQuery(domainId);
  const [
    updateDomain,
    {
      isSuccess: isUpdateSuccess,
      isLoading: isUpdatePending,
      isError: isUpdateError,
    },
  ] = useUpdateDomainMutation({});

  const { notify, contextHolder } = useCreateNotification();

  useEffect(() => {
    if (isUpdateSuccess) {
      notify({
        type: "success",
        message: "Success!",
        description: "The domain has been successfully updated.",
      });
      setIsDrawerOpen(false);
      callBack();
    }
  }, [isUpdateSuccess]);

  useEffect(() => {
    if (isUpdateError) {
      notify({
        type: "error",
        message: "Error!",
        description: "Something went wrong! please try again later.",
      });
    }
  }, [isUpdateError]);

  const onFinish: FormProps<DomainFormFieldType>["onFinish"] = async (values) => {
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
          {isLoading || isFetching ? (
            <div className="flex items-center gap-2">
              <LoadingOutlined />
              <span>Loading...</span>
            </div>
          ) : isError ? (
            <ErrorBox action={refetch} />
          ) : (
            <DomainForm
              isPending={isUpdatePending}
              initialValues={info}
              onFinish={onFinish}
            />
          )}
        </Drawer>
      </>
    );
}
