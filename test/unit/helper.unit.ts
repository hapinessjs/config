import { test, suite } from 'mocha-typescript';
import * as unit from 'unit.js';
import { Config } from '../../src';
import { ConfigHelper } from '../../src/helper';
import * as config from 'config';

process.env.SUPPRESS_NO_CONFIG_WARNING = 'true';

@suite('Config Helper')
class ConfigHelperTest {

    @test('Get Provider')
    testGetPorivder() {
        Config.load();
        const provider = ConfigHelper.getProvider();
        unit.object(provider).hasProperties(['provide', 'useValue']);
        unit.object(provider.useValue);
        unit.string(provider.useValue.constructor.name).is('Config');
        unit.function(provider.useValue.get);
        unit.function(provider.useValue.has);
        unit.object(provider.useValue.util);
        unit.object(provider.useValue.get('my_module')).is({
            user: 'michel',
            password: 'pancetta',
            host: 'localhost'
        });
    }

    @test('Get Provider with key')
    testGetPorivderWKey() {
        const provider = ConfigHelper.getProvider('my_module');
        unit.object(provider).hasProperties(['provide', 'useValue']);
        unit.object(provider.useValue);
        unit.function(provider.useValue.get);
        unit.function(provider.useValue.has);
        unit.object(provider.useValue.util);
        unit.object(provider.useValue).is({
            user: 'michel',
            password: 'pancetta',
            host: 'localhost'
        });
    }

    @test('Get Provider with key, again, should not recreate a new InjectionToken')
    testGetPorivderWKeyAgain() {
        const provider = ConfigHelper.getProvider('my_module');
        unit.object(provider).hasProperties(['provide', 'useValue']);
        unit.object(provider.useValue);
        unit.function(provider.useValue.get);
        unit.function(provider.useValue.has);
        unit.object(provider.useValue.util);
        unit.object(provider.useValue).is({
            user: 'michel',
            password: 'pancetta',
            host: 'localhost'
        });
    }

    @test('Get Provider with key and custom value')
    testGetPorivderCustomValue() {
        const provider = ConfigHelper.getProvider('another_module', { beer: { lupulus: 10, chouffe: 28 } });
        unit.object(provider).hasProperties(['provide', 'useValue']);
        unit.object(provider.useValue);
        unit.function(provider.useValue.get);
        unit.function(provider.useValue.has);
        unit.object(provider.useValue.util);
        unit.object(provider.useValue).is({ beer: { lupulus: 10, chouffe: 28 } });
    }

    @test('Get Provider with key that does not exists')
    testGetProviderKeyNotExists() {
        const provider = ConfigHelper.getProvider('another_module');
        unit.object(provider).hasProperties(['provide', 'useValue']);
        unit.object(provider.useValue);
        unit.function(provider.useValue.get);
        unit.function(provider.useValue.has);
        unit.object(provider.useValue.util);
        unit.bool(provider.useValue.has('my_module.user')).isTrue();
        unit.bool(provider.useValue.has('prop.foo')).isTrue();
    }

}
