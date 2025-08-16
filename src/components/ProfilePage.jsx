import { useState } from "react";
import { TextInput, Button, Stack } from "@mantine/core";

export default function ProfilePage({ username, setUsername }) {
  const [newName, setNewName] = useState(username);

  const saveName = () => {
    setUsername(newName);
    localStorage.setItem("username", newName);
  };

  return (
    <Stack>
      <h2>Profile</h2>
      <TextInput
        label="Username"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <Button onClick={saveName} disabled={!newName.trim()}>
        Save Username
      </Button>
    </Stack>
  );
}
