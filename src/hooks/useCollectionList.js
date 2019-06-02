import { useEffect, useState } from "react";
import adamite, { DatabaseAdmin } from "@adamite/sdk";

function useCollectionList() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const admin = new DatabaseAdmin(adamite().database());
    setCollections(await admin.getCollections());
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return { loading, collections, refresh };
}

export default useCollectionList;
