import { APIRequestContext, APIResponse, request } from 'playwright';
import { IApiService } from './i-api.service';

export class PlaywrightApiService implements IApiService<APIResponse> {
    protected apiRequestContext?: APIRequestContext;

    public constructor(public readonly baseUrl: string) {}

    public async getAsync(uri: string, params?: Record<string, string | number | boolean>): Promise<APIResponse> {
        const requestContext = await this.getRequestContext();
        return await requestContext.get(this.buildUrl(uri), { params });
    }

    public async postFormAsync(uri: string, form: Record<string, string>): Promise<APIResponse> {
        const requestContext = await this.getRequestContext();
        return await requestContext.post(this.buildUrl(uri), { form });
    }

    public async putFormAsync(uri: string, form: Record<string, string>): Promise<APIResponse> {
        const requestContext = await this.getRequestContext();
        return await requestContext.put(this.buildUrl(uri), { form });
    }

    public async deleteFormAsync(uri: string, form: Record<string, string>): Promise<APIResponse> {
        const requestContext = await this.getRequestContext();
        return await requestContext.delete(this.buildUrl(uri), { form });
    }

    private async getRequestContext(): Promise<APIRequestContext> {
        if (!this.apiRequestContext) {
            this.apiRequestContext = await request.newContext({ ignoreHTTPSErrors: true });
        }

        return this.apiRequestContext;
    }

    private buildUrl(uri: string): string {
        return `${this.baseUrl.replace(/\/$/, '')}${uri}`;
    }
}
