export interface Response<T> {
    message?: string;
    data: T;
}

// Aqui tipamos o dado que vai ser retornado do banco. Uma mensagem que não é opcional no caso de um select, por exemplo e uma data
// para podermos tipar o retorno de cada dado específico usando generic