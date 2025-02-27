export type ILocatarioPaginado = {
    content: ILocatarioContent[]
    pageable: Pageable
    last: boolean
    totalPages: number
    totalElements: number
    first: boolean
    size: number
    number: number
    sort: Sort2
    numberOfElements: number
    empty: boolean
}

export type ILocatarioContent = {
    id: string
    nome: string
    rg: string
    cpf: string
    nascimento: string
    userId: string
    status: boolean
}

type Pageable = {
    pageNumber: number
    pageSize: number
    sort: Sort
    offset: number
    paged: boolean
    unpaged: boolean
}

type Sort = {
    sorted: boolean
    empty: boolean
    unsorted: boolean
}

type Sort2 = {
    sorted: boolean
    empty: boolean
    unsorted: boolean
}
