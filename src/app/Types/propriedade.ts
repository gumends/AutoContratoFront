import { ILocatarioContent } from "./LocatarioResponse"
import { IContentProprietario } from "./Proprietario"

export type IPropriedadePaginado = {
  content: IPropriedadeContent[]
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

export type IPropriedadeContent = {
  id: string
  rua: string
  numero: number
  numCasa: number
  bairro: string
  cep: string
  localizacao: string
  locatario: ILocatarioContent;
  aluguel: string
  dataPagamento: string
  status: boolean
  alugada: boolean
  proprietario: IContentProprietario
  propriedade: IPropriedadeContent
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
