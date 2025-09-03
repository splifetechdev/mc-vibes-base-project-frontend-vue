import httpClient from "@/services/httpClient";
import {
    server
} from "@/services/constants";

export const getAllContact = () => {
    return httpClient.get(server.CONTACT + `/getAll`);
};

export const getAllContactLimit200 = () => {
         return httpClient.get(server.CONTACT + `/getAllLimit200`);
       };

export const getContactByContactType = (id) => {
    return httpClient.get(server.CONTACT + `/getByContact_type/${id}`);
};

export const createContact = (data) => {
    return httpClient.post(server.CONTACT, data);
};

export const updateContact = (id, data) => {
    return httpClient.put(server.CONTACT + `/${id}`, data);
};


export const deleteContact = (id) => {
    return httpClient.delete(server.CONTACT + `/${id}`);
};