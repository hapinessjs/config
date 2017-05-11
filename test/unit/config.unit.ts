import { test, suite } from 'mocha-typescript';
import * as unit from 'unit.js';
import { Config } from '../../src';

@suite('Config')
class ConfigTest {

    @test('Load')
    testLoad() {

        process.env.SUPPRESS_NO_CONFIG_WARNING = true;

        const c = require('config');
        c.prop = {
            foo: 'test'
        };
        Config.load();
        unit.object(Config['data']['prop']).is({ foo: 'test' });

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
}
