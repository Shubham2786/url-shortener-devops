import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ContextProvider } from "./context/ContextApi";
import { getApps } from "./utils/helper";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  const CurrentApp = getApps();

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <CurrentApp />
        <Toaster position="bottom-center" />
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
