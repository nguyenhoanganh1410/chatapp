import axiosClient from "./axiosClient";

const conversationApi = {
  // GET: /users/login
  // send username, password
  // res: token, user
  getConversations: (id) => {
    //console.log(id);
    const url = `/conversation/user/${id}`;
    return axiosClient.get(url);
    // return axiosClient.get(
    //   `http://13.228.206.211:3005/conversation/user/${id}`
    // );
    //http://13.228.206.211:3005/conversation/634c48221a479239b4810cb6
  },
  // getConversations1: () => {
  //   //console.log(id);
  //   // return axiosClient.get("/conversation", {
  //   //   params: {
  //   //     user: id,
  //   //   },
  //   // });
  //   return axiosClient.get(
  //     "http://13.228.206.211:3005/conversation/user/ztpYIbpqoiYVDVsf0h9Clzg7QgW2"
  //   );
  //   //http://13.228.206.211:3005/conversation/634c48221a479239b4810cb6
  // },

  //POST /users/me
  //send token
  //res: user
  // me: () => {
  //   return axiosClientNew.get("users/me");
  // },

  // logout: () => {
  //   return axiosClientNew.post("users/me/logout");
  // },
};

export default conversationApi;
