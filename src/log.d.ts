declare interface Log {
    (...args: any[]): void;
    error?: (...args: any[]) => void;
    green?: (...args: any[]) => void;
    magenta?: (...args: any[]) => void;
    warn?: (...args: any[]) => void;
    debug?: (...args: any[]) => void;
}
