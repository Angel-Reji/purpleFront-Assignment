export class Detail {
    constructor(
            public documentTypeId: string,
            public fileType: string,
            public received: string,
            public pageCount: string,
            public fileSize: string,
            public attributes: Attributes[]
    ) { }
}
export class Attributes {
    constructor(
            public attributeId: string,
            public value: string
    ) { }
}