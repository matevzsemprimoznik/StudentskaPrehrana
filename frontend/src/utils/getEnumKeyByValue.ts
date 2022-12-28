export function getEnumKeyByValue<Enum> (enumVariable: any, value: string) {
    const indexOf = Object.values(enumVariable).indexOf(value as unknown as Enum);

    const key = Object.keys(enumVariable)[indexOf];

    return key as Enum;
}