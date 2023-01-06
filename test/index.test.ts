import { expect, it, describe } from 'vitest'
import { useBaseMath, useBaseUnits, useFirstChar, useAMultipler, useCalculatedUnits } from '../src'


describe('useBaseMath', () => {
    const tests = [
        {
            name: '1000 ** 1',
            input: {
                base: 1000,
                multipler: 1
            },
            output: 1000
        },
        {
            name: '1000 ** 2',
            input: {
                base: 1000,
                multipler: 2
            },
            output: 1000000
        },
        {
            name: '1000 ** 3',
            input: {
                base: 1000,
                multipler: 3
            },
            output: 1000000000
        },
    ]

    for (const test of tests) {
        it(test.name, () => {
            const math = useBaseMath(test.input.base, test.input.multipler)

            expect(math).eq(test.output)
        })
    }
})


describe('useBaseUnits', () => {
    const tests = [
        {
            name: '1 1',
            input: 1,
            multi: 1,
            output: 1000
        },
        {
            name: '2 1',
            input: 2,
            multi: 1,
            output: 2000
        },
        {
            name: '1 2',
            input: 1,
            multi: 2,
            output: 1000000
        },
        {
            name: '1 3',
            input: 1,
            multi: 3,
            output: 1000000000
        },
        {
            name: '2 3',
            input: 2,
            multi: 3,
            output: 2000000000
        },
    ]

    for (const test of tests) {
        it(test.name, () => {
            const units = useBaseUnits(test.input, 1000, test.multi)

            expect(units).eq(test.output)
        })
    }
})

describe('useFirstChar', () => {
    const tests = [
        {
            name: 'mb/s',
            input: 'mb/s',
            output: 'm'
        },
        {
            name: 'ksol/s',
            input: 'ksol/s',
            output: 'k'
        },
        {
            name: '1 String',
            input: '1',
            output: '1'
        },
        {
            name: '51 String',
            input: '51',
            output: '5'
        },
        {
            name: '4 Number',
            input: 4,
            output: '4'
        },
    ]

    for (const test of tests) {
        it(test.name, () => {
            const char = useFirstChar(test.input)

            expect(char).eq(test.output)
        })
    }
})

describe('useAMultipler', () => {
    const tests = [
        {
            name: 'k',
            input: 'k',
            output: 1
        },
        {
            name: 'm',
            input: 'm',
            output: 2
        },
        {
            name: 'g',
            input: 'g',
            output: 3
        },
        {
            name: '3',
            input: 3,
            output: 3
        },
        {
            name: '2',
            input: '2',
            output: 2
        },
    ]

    for (const test of tests) {
        it(test.name, () => {
            const multi = useAMultipler(test.input)

            expect(multi).eq(test.output)
        })
    }
})

describe('useCalculatedUnits', () => {
    const tests = [
        {
            name: '1000 megabytes to kilobytes',
            input: {
                quantity: 1, 
                inputUnit: 'megabytes',
                outputUnit: 'kilobytes',
            },
            output: 1000
        },
        {
            name: '1 gh/s to mh/s',
            input: {
                quantity: 1, 
                inputUnit: 'gh/s',
                outputUnit: 'mh/s',
            },
            output: 1000
        },
        {
            name: '1200 ksol to msol and pretty',
            input: {
                quantity: 1200, 
                inputUnit: 'ksol',
                outputUnit: 'msol',
                options: {
                    unit: 'Sol',
                    pretty: true
                }
            },
            output: '1.2 MSOL'
        },
        {
            name: '1 TB to mega and pretty',
            input: {
                quantity: 1, 
                inputUnit: 'TB',
                outputUnit: 'mega',
                options: {
                    unit: 'B',
                    base: 1024,
                    pretty: true
                }
            },
            output: '1048576 MB'
        },
    ]

    for (const test of tests) {
        it(test.name, () => {
            const calc = useCalculatedUnits(test.input.quantity, test.input.inputUnit, test.input.outputUnit, test.input.options)

            expect(calc).eq(test.output)
        })
    }
})
