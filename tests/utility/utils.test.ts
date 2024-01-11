import {expect, test} from 'vitest';
import {add} from '../../utility/utils';
test("Test Addition of two numbers" , () => {
    expect(add(2,3)).toBe(5);
})