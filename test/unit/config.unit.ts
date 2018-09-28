process.env.SUPPRESS_NO_CONFIG_WARNING = 'true';

import { test, suite } from 'mocha-typescript';
import * as unit from 'unit.js';
import { Config } from '../../src';

@suite('Config')
class ConfigTest {

    @test('Get without any data should throw')
    testEmptyData() {
      const stub = unit.stub(Config, 'load');
      Config['_data'] = undefined;
      unit.exception(_ => {
          unit.when('Throw if no data', Config.get('prop'));
      }).isInstanceOf(Error).hasProperty('message', 'Empty config data');
      stub.restore();
    }

    @test('Load')
    testLoad() {
        unit.undefined(Config['_data']);
        unit.object(Config.get('prop')).is({ foo: 'test' });
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

    @test('Get with a falsy value as default value should return it')
    testGetFalsyDefaultValue() {
        unit.must(Config.get('null', null)).equal(null);
        unit.must(Config.get('false', false)).equal(false);
        unit.must(Config.get('empty-string', '')).equal('');
        unit.must(Config.get('undefined', undefined)).equal(undefined);
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
