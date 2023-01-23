type Action<T> = T | ((previous: T) => T);

type Dispatch<Action> = (action: Action) => void;

declare function useState<T>(initial: T | (() => T)): [T, Dispatch<Action<T>>];
