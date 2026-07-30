import { APIResponse } from '@playwright/test';
import { IApiService } from '../services/i-api.service';
import { assertShape } from '../services/assert-shape';
import { CreateAccountRequestDto, ErrorResponseDto, UserDetailResponseDto } from '../models';

export class AccountApi {
    public constructor(private readonly apiService: IApiService<APIResponse>) {}

    public async createAccountAsync(request: CreateAccountRequestDto): Promise<[APIResponse, ErrorResponseDto]> {
        const response = await this.apiService.postFormAsync('/createAccount', request as unknown as Record<string, string>);
        const responseBody: unknown = await response.json();
        assertShape<ErrorResponseDto>(responseBody, ['responseCode', 'message'], 'POST /createAccount');

        return [response, responseBody];
    }

    public async deleteAccountAsync(email: string, password: string): Promise<[APIResponse, ErrorResponseDto]> {
        const response = await this.apiService.deleteFormAsync('/deleteAccount', { email, password });
        const responseBody: unknown = await response.json();
        assertShape<ErrorResponseDto>(responseBody, ['responseCode', 'message'], 'DELETE /deleteAccount');

        return [response, responseBody];
    }

    public async getUserDetailByEmailAsync(email: string): Promise<[APIResponse, UserDetailResponseDto]> {
        const response = await this.apiService.getAsync('/getUserDetailByEmail', { email });
        const responseBody: unknown = await response.json();
        assertShape<UserDetailResponseDto>(responseBody, ['responseCode', 'user'], 'GET /getUserDetailByEmail');

        return [response, responseBody];
    }

    public async verifyLoginAsync(email: string, password: string): Promise<[APIResponse, ErrorResponseDto]> {
        const response = await this.apiService.postFormAsync('/verifyLogin', { email, password });
        const responseBody: unknown = await response.json();
        assertShape<ErrorResponseDto>(responseBody, ['responseCode', 'message'], 'POST /verifyLogin');

        return [response, responseBody];
    }

    public async verifyLoginWithoutEmailAsync(password: string): Promise<[APIResponse, ErrorResponseDto]> {
        const response = await this.apiService.postFormAsync('/verifyLogin', { password });
        const responseBody: unknown = await response.json();
        assertShape<ErrorResponseDto>(responseBody, ['responseCode', 'message'], 'POST /verifyLogin (no email)');

        return [response, responseBody];
    }
}
