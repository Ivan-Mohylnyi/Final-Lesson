import { expect } from 'chai';
import { test } from '@playwright/test';
import { assertShape } from '../../src/services';

interface Example {
    id: number;
    name: string;
}

test.describe('assertShape', () => {
    test('does not throw when all required keys are present', () => {
        expect(() => assertShape<Example>({ id: 1, name: 'ok' }, ['id', 'name'], 'context')).to.not.throw();
    });

    test('throws with a clear message when a required key is missing', () => {
        expect(() => assertShape<Example>({ id: 1 }, ['id', 'name'], 'GET /example')).to.throw(/GET \/example.*missing expected field\(s\): name/);
    });

    test('throws when the response body is not an object (e.g. an HTML error page slipped through)', () => {
        expect(() => assertShape<Example>('<!doctype html>', ['id', 'name'], 'GET /example')).to.throw(/expected a JSON object/);
    });

    test('throws when the response body is null', () => {
        expect(() => assertShape<Example>(null, ['id', 'name'], 'GET /example')).to.throw(/expected a JSON object/);
    });
});
