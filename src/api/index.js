import axios from "axios";
import apiKeys from "../apiKeys";
export const apiCall = async (cityName) => {
  const res = await axios.get(
    `${apiKeys.basename}weather?q=${cityName}&units=metric&APPID=${apiKeys.key}`,
  );
  return res;
};
