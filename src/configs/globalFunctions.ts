export const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>): void => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func(...args);
        }, delay) as any; // Cast to any to avoid TypeScript error
    };
};

export const debounceRouterPush = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>): void => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func(...args);
        }, delay) as any; // Cast to any to avoid TypeScript error
    };
};