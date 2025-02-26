import { Content } from "./LocatarioResponse"

export type IPropriedadePaginado = {
  content: IContent[]
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

export type IContent = {
  id: string
  rua: string
  numero: number
  bairro: string
  cep: string
  localizacao: string
  locatario: Content;
  aluguel: string
  dataPagamento: string
  proprietarioID: string
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
