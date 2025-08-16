import { AppShell, Tabs } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentTab = location.pathname === "/profile" ? "profile" : "home";
  console.log(currentTab);

  return (
    <AppShell>
      <Tabs
        value={currentTab}
        onChange={(value) => navigate(value === "home" ? "/" : `/${value}`)}
      >
        <Tabs.List>
          <Tabs.Tab value="home">Home</Tabs.Tab>
          <Tabs.Tab value="profile">Profile</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </AppShell>
  );
}
