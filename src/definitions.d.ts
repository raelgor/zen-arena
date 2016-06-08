declare interface EventEmitterMethods {
    on(...args: any[]): void;
    emit(...args: any[]): void;
}

declare interface ClusterFlags {
    DEBUG_MODE: boolean;
    TEST_MODE: boolean;
}

declare class ThunkRedisClient {
    on(...args: any[]): void;
    emit(...args: any[]): void;
}

declare module 'thunk-redis' {
    export function createClient(...args: any[]): ThunkRedisClient;
}

declare namespace NodeJS {
  interface Global {
    log: Log;
  }
}

declare var global: NodeJS.Global;

declare var log: Log;
declare var dataTransporter: any;
declare var packageInfo: any;
declare var postman: any;
declare var loaddirSync: any;
