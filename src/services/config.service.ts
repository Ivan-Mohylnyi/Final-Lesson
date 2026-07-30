import { ConfigDto } from '../models';

export class ConfigService {
    public get config(): ConfigDto {
        return {
            webBaseUrl: 'https://automationexercise.com',
            apiBaseUrl: 'https://automationexercise.com/api'
        };
    }
}
