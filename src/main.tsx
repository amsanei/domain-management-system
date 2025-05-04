import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./state/store.ts";
import { Provider } from "react-redux";
import Sidebar from "./components/layout/Sidebar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="grid grid-cols-12 bg-neutral-100 min-h-screen">
      <Sidebar />
      <div className="col-span-10 p-8">
        <div className="bg-white rounded-xl p-4">
          <Provider store={store}>
            <App />
          </Provider>
        </div>
      </div>
    </div>
  </StrictMode>
);
