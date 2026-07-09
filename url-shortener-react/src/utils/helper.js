import { subdomainList } from "./constant";

export const getSubdomain = (location) => {
    const locationParts = location.split(".");
    const isLocalhost = locationParts.slice(-1)[0].includes("localhost");
    const sliceTill = isLocalhost ? -1 : -2;
    const subdomainParts = locationParts.slice(0, sliceTill);
    return subdomainParts.join(".");
};

export const getApps = () => {
    const subdomain = getSubdomain(window.location.hostname);
    const mainApp = subdomainList.find((app) => app.main);
    
    if (subdomain === "") {
        return mainApp.app;
    }
    
    const apps = subdomainList.find((app) => app.subdomain === subdomain);
    return apps ? apps.app : mainApp.app;
};
