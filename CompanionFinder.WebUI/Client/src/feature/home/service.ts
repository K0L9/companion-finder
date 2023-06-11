import http from "../../http_common";

export const getUserIdAsync = async () => {
  var userId = await http.get<string>("api/user/get-user-id").then((result) => {
    return result.data;
  });

  return userId;
};

export const calculateTimeInSeconds = (
  timeInSeconds: number
): (number | string)[] => {
  let hours: number = Math.floor(timeInSeconds / 3600);
  let minutes: number = Math.floor((timeInSeconds - hours * 3600) / 60);
  let seconds: number = timeInSeconds - hours * 3600 - minutes * 60;

  return [
    hours < 10 ? `0${hours}` : hours,
    minutes < 10 ? `0${minutes}` : minutes,
    seconds < 10 ? `0${seconds}` : seconds,
  ];
};

export default calculateTimeInSeconds;
