import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { toggle } from "../../state/theme/themeSlice";

export default function ThemeSwicher() {
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch();
  return (
    <Button type="default" shape="circle" onClick={() => dispatch(toggle())}>
      {theme ? <SunOutlined /> : <MoonOutlined />}
    </Button>
  );
}
