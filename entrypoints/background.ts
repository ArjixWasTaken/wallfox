import { registerRPCService } from "@webext-pegasus/rpc";
import { initPegasusTransport } from "@webext-pegasus/transport/background";
import { defineJobScheduler } from "@webext-core/job-scheduler";
import { IService } from "@/src/types";

const serviceImports = import.meta.glob("../src/services/*.service.ts");
const services = Object.values(serviceImports) as (() => Promise<{ default: IService }>)[];

export default defineBackground(async () => {
    const scheduler = defineJobScheduler();
    initPegasusTransport();

    for (const importService of services) {
        const { name, service, jobs } = (await importService()).default;

        // Register RPC Service
        registerRPCService(name, new service());

        for (const job of jobs ?? []) {
            scheduler.scheduleJob(job);
        }
    }
});
