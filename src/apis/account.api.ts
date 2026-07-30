import { APIResponse } from '@playwright/test';
import { IApiService } from '../services/i-api.service';
import { CreateAccountRequestDto, ErrorResponseDto, UserDetailResponseDto } from '../models';

export class AccountApi {
    public constructor(private readonly apiService: IApiService<APIResponse>) {}

    public async createAccountAsync(request: CreateAccountRequestDto): Promise<[APIResponse, ErrorResponseDto]> {
        const response = await this.apiService.postFormAsync('/createAccount', request as unknown as Record<string, string>);
        const responseBody = await response.json() as ErrorResponseDto;

        return [response, responseBody];
    }

    public async deleteAccountAsync(email: string, password: string): Promise<[APIResponse, ErrorResponseDto]> {
        const response = await this.apiService.deleteFormAsync('/deleteAccount', { email, password });
        const responseBody = await response.json() as ErrorResponseDto;

        return [response, responseBody];
    }

    public async getUserDetailByEmailAsync(email: string): Promise<[APIResponse, UserDetailResponseDto]> {
        const response = await this.apiService.getAsync('/getUserDetailByEmail', { email });
        const responseBody = await response.json() as UserDetailResponseDto;

        return [response, responseBody];
    }

    public async verifyLoginAsync(email: string, password: string): Promise<[APIResponse, ErrorResponseDto]> {
        const response = await this.apiService.postFormAsync('/verifyLogin', { email, password });
        const responseBody = await response.json() as ErrorResponseDto;

        return [response, responseBody];
    }

    public async verifyLoginWithoutEmailAsync(password: string): Promise<[APIResponse, ErrorResponseDto]> {
        const response = await this.apiService.postFormAsync('/verifyLogin', { password });
        const responseBody = await response.json() as ErrorResponseDto;

        return [response, responseBody];
    }
}
