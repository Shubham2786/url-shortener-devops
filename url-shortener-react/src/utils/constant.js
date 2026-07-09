import AppRouter, { SubDomainRouter } from "../appRouter";

export const subdomainList = [
    {
        subdomain: "www",
        app: AppRouter,
        main: true
    },
    {
        subdomain: "url",
        app: SubDomainRouter,
        main: false
    }
];
