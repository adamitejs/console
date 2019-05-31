import { useEffect, useState } from "react";
import adamite, { DatabaseAdmin } from "@adamite/sdk";

function useCollectionList() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCollections = async () => {
      const admin = new DatabaseAdmin(adamite().database());
      setCollections(await admin.getCollections());
      setLoading(false);
    };

    loadCollections();
  }, []);

  return { loading, collections };
}

export default useCollectionList;
