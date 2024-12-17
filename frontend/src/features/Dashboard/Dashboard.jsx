import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

function Dashboard() {
  const { user } = useAuth0();
  console.log(user);

  return (
    <>
      <h1>Hello india</h1>
    </>
  );
}

export default Dashboard;
