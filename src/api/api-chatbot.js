import { axiosChatbot } from "./axios-chatbot";

export const apiChatbot = {
    getChatbot: () => {
        const url = `/webhooks/rest`;
        return axiosChatbot.get(url);
    },
    postMessage: (params) => {
        const url = `/webhooks/rest/webhook`;
        return axiosChatbot.post(url, params);
    },
};