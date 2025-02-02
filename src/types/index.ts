import { Job } from "@webext-core/job-scheduler";
import { IPegasusRPCService } from "@webext-pegasus/rpc";

export type IService = {
    name: string;
    service: IPegasusRPCService<unknown> & { new (...args: any[]): any };
    jobs?: Job[];
};
