import { Injectable, InjectionToken } from '@hapiness/core';
import { Config, ConfigInterface } from './index';

const ConfigInjectionTokens = {};
const ConfigFileInjectionToken = new InjectionToken('HAPINESS_CONFIG');

export declare type ConfigProvider = {
    provide: InjectionToken<any>,
    useValue: ConfigInterface
}

export class ConfigHelper {

    static getInjectionToken(key?: string) {
        if (!key) {
            return ConfigFileInjectionToken;
        }

        if (!ConfigInjectionTokens[key]) {
            ConfigInjectionTokens[key] = new InjectionToken(`HAPINESS_CONFIG_${key}`);
        }

        return ConfigInjectionTokens[key];
    }

    static getProvider(key?: string): ConfigProvider {
        if (!key) {
            return {
                provide: ConfigHelper.getInjectionToken(),
                useValue: Config.getData(),
            };
        }

        return {
            provide: ConfigHelper.getInjectionToken(key),
            useValue: Config.get(key)
        };
    }

}
