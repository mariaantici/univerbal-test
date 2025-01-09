export type Opaque<B, T extends string = string> = T & { readonly __brand: B };
