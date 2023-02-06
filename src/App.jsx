import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AdoptedPetContext from "./AdoptedPetContext";

import Spinner from "./Spinner";

const Details = lazy(() => import("./routes/Details"));
const Home = lazy(() => import("./routes/Home"));
const Navigation = lazy(() => import("./routes/Navigation"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      {
        index: true,
        element: <Home />,
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
    <AdoptedPetContext.Provider value={adoptedPet}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Spinner />}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </AdoptedPetContext.Provider>
  );
};

export default App;
