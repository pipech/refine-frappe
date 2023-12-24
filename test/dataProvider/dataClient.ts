import { IFrappeProviderParams } from "../../src/types";

export const frappeConfig: IFrappeProviderParams = {
    url: "https://alpha-be.cafn.dev",
    tokenParams: {
        useToken: true,
        token: () => "94ce55fdf91556f:eb1280f00b836e5",
        type: "token",
    },
};
