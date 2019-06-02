import { useEffect, useState } from "react";
import adamite, { AuthAdmin } from "@adamite/sdk";

function useCollectionList(userId) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const admin = new AuthAdmin(adamite());
    setUser(await admin.getUserInfo(userId));
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, [userId]);

  return { loading, user, refresh };
}

export default useCollectionList;
