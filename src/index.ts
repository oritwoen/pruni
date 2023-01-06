export const units = ['k', 'm', 'g', 't', 'p', 'e', 'z', 'j']

export interface UnitsOptions {
    unit?: string
    base?: number
    pretty?: boolean
}

export function useBaseMath (base: number, multiplier: number): number {
    return base ** multiplier
}

export function useBaseUnits (quantity: number, base: number, multipler: number): number {
    return quantity * useBaseMath(base, multipler)
}

export function useFirstChar (input: string | number) {
    return String(input).toLowerCase().charAt(0)
}

export function useAMultipler (unit: string | number): number {
    const string = useFirstChar(unit)
    const multipler = isNaN(Number(string)) ? units.indexOf(string) + 1 : string

    return Number(multipler);
}

export function useCalculatedUnits(quantity: number, inputUnit: string | number, outputUnit: string | number, options?: UnitsOptions): number | string {
    const defaultUnit = options?.unit || 'b'
    const defaultBase = options?.base || 1000
    
    const multiplerInput = useAMultipler(inputUnit)
    const multiplerOutput = useAMultipler(outputUnit)

    const calculatedUnits = useBaseUnits(quantity, defaultBase || 1000, multiplerInput) / useBaseMath(defaultBase, multiplerOutput)

    return options?.pretty ? String(`${calculatedUnits} ${(useFirstChar(outputUnit) + defaultUnit).toUpperCase()}`) : calculatedUnits
}
