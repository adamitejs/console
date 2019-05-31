import { useEffect, useState } from "react";
import adamite, { AuthAdmin } from "@adamite/sdk";

function useCollectionList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCollections = async () => {
      const admin = new AuthAdmin(adamite());
      setUsers(await admin.getUsers());
      setLoading(false);
    };

    loadCollections();
  }, []);

  return { loading, users };
}

export default useCollectionList;
