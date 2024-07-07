import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import About from "./pages/About";
import Vans, { loader as vansLoader } from "./pages/Vans";
import VanDetail, { loader as VanDetailLoader } from "./pages/VanDetail";
import Dashboard from "./host/Dashboard";
import Income from "./host/Income";
import Reviews from "./host/Reviews";
import Hostlayout from "./components/Hostlayout";
import HostVans, { loader as vanshostLoader } from "./host/HostVans";
import HostVanDetail, {
  loader as vanhostdetailLoader,
} from "./host/HostVanDetail";
import HostVanInfo from "./host/HostVanInfo";
import HostVanPricing from "./host/HostVanPricing";
import HostVanPhotos from "./host/HostVanPhotos";
import Error from "./pages/Error";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./host/Login";
import RequireAuth from "./host/RequireAuth";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
      />
      <Route path="vans" element={<Vans />} loader={vansLoader} />
      <Route path="vans/:id" element={<VanDetail />} loader={VanDetailLoader} />
      <Route path="host" element={<Hostlayout />}>
        <Route
          index
          element={<Dashboard />}
          loader={async ({ request }) => await RequireAuth(request)}
        />
        <Route
          path="income"
          element={<Income />}
          loader={async ({ request }) => await RequireAuth(request)}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async ({ request }) => await RequireAuth(request)}
        />
        <Route path="vans" element={<HostVans />} loader={vanshostLoader} />
        <Route
          path="vans/:id"
          element={<HostVanDetail />}
          loader={vanhostdetailLoader}
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={async ({ request }) => await RequireAuth(request)}
          />
          <Route
            path="pricing"
            element={<HostVanPricing />}
            loader={async ({ request }) => await RequireAuth(request)}
          />
          <Route
            path="photos"
            element={<HostVanPhotos />}
            loader={async ({ request }) => await RequireAuth(request)}
          />
        </Route>
      </Route>
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
