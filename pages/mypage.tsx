import { useRouter } from "next/router";
import { useAuth } from "../context/auth";

const Mypage = () => {
  const { isLoading, fbUser, user } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return null;
  }

  if (!fbUser) {
    router.push("/login");
    return null;
  } else {
    console.log(user);
  }

  return (
    <div>
      <h1>マイページ</h1>
      <p>名前:{user?.name}</p>
      <p>プロフィール{user?.profile}</p>
    </div>
  );
};

export default Mypage;
