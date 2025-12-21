import { usePathname, useRouter } from "next/navigation";
import { allowedPathName } from "../constants/allowedPathName";

export const PrivateRouter = () => {
  const router = useRouter();
  const path = usePathname();
  const token = localStorage.getItem("accessToken");

  if (allowedPathName.includes(path) && !token) {
    router.push("/sign-in");
  } else if (!allowedPathName.includes(path) && token) {
    router.push("/");
  }
};
