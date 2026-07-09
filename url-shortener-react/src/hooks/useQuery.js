import { useQuery } from "react-query";
import api from "../api/api";

export const useFetchTotalClicks = (token, onError) => {
    return useQuery(
        ["fetch-total-clicks", token],
        async () => {
            const currentYear = new Date().getFullYear();
            const response = await api.get(`/api/urls/analytics/totalClicks?startDate=${currentYear}-01-01&endDate=${currentYear}-12-31`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return response;
        },
        {
            select: (data) => {
                const apiData = data.data;
                const convertToArray = Object.keys(apiData).map(key => ({
                    clickDate: key,
                    count: apiData[key]
                }));
                return convertToArray;
            },
            onError: onError,
            staleTime: 5000,
            enabled: !!token
        }
    );
};

export const useFetchMyShortUrls = (token, onError) => {
    return useQuery(
        ["fetch-my-short-urls", token],
        async () => {
            const response = await api.get("/api/urls/myUrls", {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return response;
        },
        {
            select: (data) => {
                const apiData = data.data;
                return [...apiData].sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
            },
            onError: onError,
            staleTime: 5000,
            enabled: !!token
        }
    );
};
