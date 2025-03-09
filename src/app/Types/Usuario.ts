export interface IUsuarioResponse {
    content: IUsuarioContent[]
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
  
  export interface IUsuarioContent {
    id: string
    nome: string
    cpf: string
    email: string
    permissao: string
    createdAt: string
    updatedAt: string
    enabled: boolean
    authorities: Authority[]
    username: string
    accountNonExpired: boolean
    accountNonLocked: boolean
    credentialsNonExpired: boolean
  }
  
  export interface Authority {
    authority: string
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
  