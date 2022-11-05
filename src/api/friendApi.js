import axiosClient from "./axiosClient";


const friendApi = {
  
    getListFriend: (id) => {
        const url = `friends/list/${id}`;
        return axiosClient.get(url);
    },

    getListRequest: (id) => {
        const url = `friends/invites/${id}`;
        return axiosClient.get(url);
    },

    acceptFriend: (id,freId) => {
        return axiosClient.post(`friends/${freId}`, {
            id: id,
          });
    },

    sendInvite: (id,freId) => {
        return axiosClient.post(`friends/invites/me/${freId}`, {
            id: id,
          });
    },

};

export default friendApi;
