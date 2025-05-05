import { useSelector } from "react-redux";
import DomainsList from "./components/DomainsList";
import AppLayout from "./components/layout/AppLayout";
import { ConfigProvider, theme } from "antd";
import { RootState } from "./state/store";

function App() {
  const appTheme = useSelector((state: RootState) => state.theme);
  return (
    <ConfigProvider
      theme={{
        algorithm:
          appTheme.value === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <AppLayout className={appTheme.value}>
        <DomainsList />
      </AppLayout>
    </ConfigProvider>
  );
}

export default App;
