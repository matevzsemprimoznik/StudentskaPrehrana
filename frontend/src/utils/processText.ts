export const processText = (text: string | undefined) => {
    if(!text)
        return ''
    return text[0].toUpperCase() + text.slice(1).toLowerCase();
}