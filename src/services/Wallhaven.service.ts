import { IPegasusRPCService, PegasusRPCMessage } from "@webext-pegasus/rpc";
import { SearchResults } from "../types/Wallhaven";
import { Duration } from "../utils";
import { IService } from "../types";

const baseUrl = "https://wallhaven.cc/api/v1";

class WallhavenAPI {
    constructor(private apiKey?: string) {}

    async search(): Promise<SearchResults> {
        const params = new URLSearchParams({
            categories: "010",
            purity: "100",
            sorting: "random",
        });

        const res = await fetch(`${baseUrl}/search?${params}`);
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return res.json();
    }
}

export type IWallhavenService = InstanceType<typeof WallhavenService>;
class WallhavenService implements IPegasusRPCService<WallhavenService> {
    async search(_sender: PegasusRPCMessage): Promise<SearchResults> {
        return new WallhavenAPI().search();
    }
}

export default <IService>{
    name: "WallhavenService",
    service: WallhavenService,
    jobs: [
        {
            id: "Wallhaven::fetchWallpaper",
            type: "interval",
            duration: Duration.minutes(5),
            immediate: true,
            async execute() {
                const results = await new WallhavenAPI().search();
                console.log(results);
            },
        },
    ],
};
