export interface Moment {
    id?: number;                 // "?" indica que esse campo é opcional, quando criamos um dado não precisamos do id pois ele é auto
    title: string;               // incremento.
    description: string;
    image: string;
    created_at?: string;
    updated_at?: string;
    comments?: [{ text: string, username: string }];
}