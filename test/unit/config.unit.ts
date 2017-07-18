process.env.SUPPRESS_NO_CONFIG_WARNING = 'true';

import { test, suite } from 'mocha-typescript';
import * as unit from 'unit.js';
import { Config } from '../../src';

@suite('Config')
class ConfigTest {

    @test('Load')
    testLoad() {
        Config.load();
        unit.object(Config['_data']['prop']).is({ foo: 'test' });

    }

    @test('Has')
    testHas() {

        unit.must(Config.has('key')).equal(false);
        unit.must(Config.has('prop')).equal(true);
        unit.must(Config.has('prop.foo')).equal(true);

    }

    @test('Get')
    testGet() {

        unit.must(Config.get('key')).equal(undefined);
        unit.must(Config.get('prop.foo')).equal('test');
        unit.must(Config.get('prop.fii', 1000)).equal(1000);

    }

    @test('Load custom payload')
    testLoadCustom() {
        Config.load({
            user: {
                name: {
                    first: 'Jordy',
                    last: 'LaFrite'
                }
            }
        });

        const user = Config.get('user');
        unit.object(user);
        unit.function(user.get);
        unit.function(user.has);
        unit.bool(user.has('email')).isFalse();
        unit.function(user.get('name').get);
        unit.string(user.get('name').get<string>('first')).is('Jordy');
    }

    @test('Get data')
    testGetData() {
        unit.function(Config.getData);
        const configData = Config.getData();
        unit.object(configData).is({
            user: {
                name: {
                    first: 'Jordy',
                    last: 'LaFrite'
                }
            }
        });
    }
}
