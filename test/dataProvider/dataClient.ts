import { IDataProviderParams } from "../../src/types";

export const frappeConfig: IDataProviderParams = {
    url: "https://beta-be.cafn.dev",
    tokenParams: {
        useToken: true,
        token: () => "049067737c911c1:5b467c1e3d63b6f",
        type: "token",
    },
};
