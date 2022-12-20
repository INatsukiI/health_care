import { getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Content } from "../../types/content";

const ContentDetailPage = () => {
  const [content, setContent] = useState<Content>();
  const router = useRouter();
  const contentId = router.query.id;

  useEffect(() => {
    //IDを元にdbから相当するデータを取り出す
    //const ref =
    // if (contentId) {
    //  getDoc(ref).then((snap) => {
    //    setContent(snap.data() as Content);
    //  });
    // }
  }, [contentId]);

  if (!content) {
    return null;
  }

  return <div>{contentId}</div>;
};

export default ContentDetailPage;
