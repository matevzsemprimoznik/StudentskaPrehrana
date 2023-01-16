export const objectToDotNotation = (object: Object) => {
    const result = {};

    function build(obj: Object, current: string | null = null) {
        for(const key in obj) {
            const value = obj[key as keyof typeof obj];
            const newKey = (current ? current + "." + key : key)
            if(value && typeof value === "object" && !Array.isArray(value)) {
                build(value, newKey)
            } else {
                // @ts-ignore
                result[newKey] = value
            }
        }
    }
    build(object);

    return result;
}


