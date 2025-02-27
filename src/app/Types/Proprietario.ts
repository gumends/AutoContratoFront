export interface IProprietarioResponse {
    content: IContentProprietario[]
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

export interface IContentProprietario {
    id: string
    nome: string
    nacionalidade: string
    rg: string
    cpf: string
    nascimento: string
    status: boolean
    userId: string
}

export interface Pageable {
    pageNumber: number
    pageSize: number
    sort: Sort
    offset: number
    paged: boolean
    unpaged: boolean
}

export interface Sort {
    sorted: boolean
    empty: boolean
    unsorted: boolean
}

export interface Sort2 {
    sorted: boolean
    empty: boolean
    unsorted: boolean
}
