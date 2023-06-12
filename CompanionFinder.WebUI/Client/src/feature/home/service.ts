import http from "../../http_common";

export const getUserIdAsync = async () => {
  var userId = await http
    .get<string>("api/user/get-user-id")
    .then((result) => {
      return result.data;
    })
    .catch((data) => {
      return null;
    });

  return userId;
};
