import axios from "axios";

import { baseUrl } from "./baseUrl";
import { getUserId } from "./getUserId";

export const retriveUserData = async (token: string) => {
  const userId = await getUserId(token);
  try {
    const res = await axios.get(`${baseUrl}/api/me/${userId}`);
    const user = res?.data?.user;
    console.log(user)
    return user;
  } catch (error: any) {}
};
 