import { FrappeApp } from "frappe-js-sdk";

export const frappe = new FrappeApp("https://beta-be.cafn.dev", {
    useToken: true,
    token: () => "049067737c911c1:5b467c1e3d63b6f",
    type: "token",
});
