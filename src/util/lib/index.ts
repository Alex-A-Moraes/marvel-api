export const filterRegex = (field: any, content: any) => {
    let filterRegex: RegExp;
    if (content) {
        filterRegex = new RegExp(content, 'i');
        return { [field]: filterRegex };
    }
    return {};
};

export const filter = (field: any, content: any) => {
    if (content) return { [field]: content };
    return {};
};
