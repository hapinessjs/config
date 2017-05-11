import { IConfig } from 'config';

export class Config {

    private static data: IConfig;

    /**
     * Load the config
     */
    static load() {
        this.data = require('config');
    }

    /**
     * Check if the settings exists
     *
     * @param  {string} key
     * @returns boolean
     */
    static has(key: string): boolean {
        return this.data.has(key);
    }

    /**
     * Return the config value
     * from a key
     *
     * @param  {string} key
     * @param  {any} defaultValue
     * @returns any
     */
    static get(key: string, defaultValue?: any): any {
        return this.data.has(key) ? this.data.get(key) :
            !!defaultValue ? defaultValue : undefined;
    }
}
