# Hapiness Config

Configuration module based on node-config library.
Using `node-config` and `js-yaml`.

## Usage

`./config/default.yml`:

    my:
      config: test

`Node.js Script`:

    import { Config } from '@hapiness/config';

    Config.load(); // Load config, see node-config

    if (Config.has('my.config')) {
        console.log(Config.get('my.config')); // output: 'test'
    }