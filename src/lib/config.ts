import * as c from 'config';
import * as clone from 'clone';
import { IConfig } from 'config';

export interface ConfigInterface extends IConfig {
    get<T = ConfigInterface>(key: string): T;
}

export class Config {

    private static _data: ConfigInterface;

    static ensureConfigData() {
        if (!this._data) {
            this.load();
        }
    }

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

        this._data = c;
        return this._data;
    }

    static attachProtoDeep(payload): ConfigInterface {
        return this._data.util['attachProtoDeep'](payload);
    }

    /**
     * Return config data
     */
    static getData() {
        this.ensureConfigData();
        return this._data;
    }

    /**
     * Check if the settings exists
     *
     * @param  {string} key
     * @returns boolean
     */
    static has(key: string): boolean {
        this.ensureConfigData();
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
        this.ensureConfigData();

        if (!this._data) {
            throw new Error('Empty config data');
        }

        return this._data.has(key) ? this._data.get<T>(key) :
            !!defaultValue ? defaultValue : undefined;
    }

}
