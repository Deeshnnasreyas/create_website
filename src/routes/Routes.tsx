

import Layout from "@/components/Layout";
import MarketPlace from "@/pages/MarketPlace";
import MyOrders from "@/pages/MyOrders";
import MyProjects from "@/pages/MyProjects";
import MyWebsites from "@/pages/MyWebsites";
import NoFound from "@/pages/NoFound";
import WebsiteDetails from "@/pages/WebsiteDetails";
import type { RouteObject } from "react-router-dom";

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <MarketPlace /> },
      { path: "marketplace", element: <MarketPlace /> },
      { path: "mywebsite", element: <MyWebsites /> },
      { path: "mywebsite/new", element: <WebsiteDetails /> },
      { path: "mywebsite/:id", element: <WebsiteDetails /> },
      { path: "myorder", element: <MyOrders /> },
      { path: "orders", element: <MyOrders /> },
      { path: "projects", element: <MyProjects /> },
      { path: "*", element: <NoFound /> },
    ],
  },
];
