export const FilterRegex = (field: any, content: any) => {
    let filterRegex: RegExp;
    if (content) {
        filterRegex = new RegExp(content, 'i');
        return { [field]: filterRegex };
    }
    return {};
};

export const Filter = (field: any, content: any) => {
    if (content) return { [field]: content };
    return {};
};

export const SendResponse = (response: any, statusCode: any, data: any) => {
    response.status(statusCode).json({
        code: statusCode,
        status: 'OK',
        copyright: '© 2020 MARVEL',
        attributionText: 'Data provided by Marvel. © 2020 MARVEL',
        attributionHTML: '<a href="http://marvel.com">Data provided by Marvel. © 2020 MARVEL</a>',
        etag: 'f0f50f72d6ce5fc336cf70a7c2be616ce78215c8',
        data,
    });
};
