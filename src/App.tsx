import { useSelector } from "react-redux";
import AppLayout from "./components/layout/AppLayout";
import { ConfigProvider, theme } from "antd";
import { RootState } from "./state/store";
import DomainsPage from "./pages/Domains";

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
        <DomainsPage />
      </AppLayout>
    </ConfigProvider>
  );
}

export default App;
