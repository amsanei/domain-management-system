import useCreateNotification from "./hooks/useCreateNotification";
import DomainsList from "./components/DomainsList";

function App() {
  const { contextHolder } = useCreateNotification();
  return (
    <div>
      {contextHolder}
      <DomainsList />
    </div>
  );
}

export default App;
