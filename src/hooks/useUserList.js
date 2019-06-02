import { useEffect, useState } from "react";
import adamite, { AuthAdmin } from "@adamite/sdk";

function useCollectionList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const admin = new AuthAdmin(adamite());
    setUsers(await admin.getUsers());
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return { loading, users, refresh };
}

export default useCollectionList;
