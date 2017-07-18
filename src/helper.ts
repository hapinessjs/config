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

    static getProvider(key?: string, value?: any): ConfigProvider {
        const provide = ConfigHelper.getInjectionToken(key);
        if (key) {
            // key and value provided, we load the value
            if ((typeof value === 'object' && value !== null)) {
                return {
                    provide,
                    useValue: Config.attachProtoDeep(value)
                }
            } else
                // If we dont have any value but a key we check if
                // the key exists in config and use it as value
              if (Config.has(key)) {
                return {
                    provide,
                    useValue: Config.get(key)
                };
            }
        }

        // Otherwise just return the default config object
        return {
            provide,
            useValue: Config.load()
        };
    }

}
