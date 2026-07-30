export interface IApiService<T> {
    baseUrl: string;
    getAsync(uri: string, params?: Record<string, string | number | boolean>, headers?: HeadersInit): Promise<T>;
    postFormAsync(uri: string, form: Record<string, string>, headers?: HeadersInit): Promise<T>;
    putFormAsync(uri: string, form: Record<string, string>, headers?: HeadersInit): Promise<T>;
    deleteFormAsync(uri: string, form: Record<string, string>, headers?: HeadersInit): Promise<T>;
}
