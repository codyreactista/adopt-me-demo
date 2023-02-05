import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AdoptedPetContext from "./AdoptedPetContext";

import Details from "./Details";
import Navigation from "./Navigation";
import SearchParams from "./SearchParams";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      {
        index: true,
        element: <SearchParams />,
      },
      {
        path: "details/:id",
        element: <Details />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <AdoptedPetContext.Provider value={adoptedPet}>
        <RouterProvider router={router} />
      </AdoptedPetContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
