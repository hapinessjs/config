import * as c from 'config';
import * as clone from 'clone';
import { IConfig } from 'config';

export declare interface ConfigInterface extends IConfig {
    get<T = ConfigInterface>(key: string): T;
}

const config: ConfigInterface = c;

export class Config {

    private static _data: ConfigInterface;

    /**
     * Load the config
     */
    static load(payload?: any): ConfigInterface {
        if (payload) {
            // This method will make the payload object have
            // .get (chainable) .has and .util method
            // Allowing custom object to be feed in the config module
            const _payload = clone(payload);
            this._data = this.attachProtoDeep(_payload);
            return _payload;
        }

        this._data = config;
        return this._data;
    }

    static attachProtoDeep(payload): ConfigInterface {
        return config.util['attachProtoDeep'](payload);
    }

    /**
     * Return config data
     */
    static getData() {
        return this._data;
    }

    /**
     * Check if the settings exists
     *
     * @param  {string} key
     * @returns boolean
     */
    static has(key: string): boolean {
        return this._data.has(key);
    }

    /**
     * Return the config value
     * from a key
     *
     * @param  {string} key
     * @param  {any} defaultValue
     * @returns any
     */
    static get<T = ConfigInterface>(key: string, defaultValue?: any): T {
        return this._data.has(key) ? this._data.get<T>(key) :
            !!defaultValue ? defaultValue : undefined;
    }

}

export * from './helper';
