export interface Jwt {
    iss: string,
    sub: string,
    id: string,
    nome: string,
    email: string,
    permissao: number,
    exp: number
}