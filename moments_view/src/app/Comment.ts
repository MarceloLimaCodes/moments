export interface Comment {
    id?: string;
    text: string;
    username: string;
    momentId: number;
    created_at?: string;        // as datas não são obrigatórias pois, assim como o id, elas são geradas automaticamente
    updated_at?: string;
}