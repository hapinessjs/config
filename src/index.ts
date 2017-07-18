import * as c from 'config';
import { IConfig as ConfigInterface } from 'config';
export { ConfigInterface };

const config: ConfigInterface = c;

export class Config {

    private static _data: ConfigInterface;

    /**
     * Load the config
     */
    static load(payload?: any) {

        if (payload) {
            // This method will make the payload object have
            // .get (chainable) .has and .util method
            this._data = config.util.attachProtoDeep(payload);
        } else {
            this._data = config;
        }

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
