/// <reference types="vite/client" />

type Keys<T> = T extends Record<infer K, unknown> ? K : never;
type Values<T> = T extends Record<unknown, infer V> ? V : never;
