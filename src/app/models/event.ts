export interface EventModel {
    id: number;
    name: string;
    category: string;
    date_time: Date | string;
    location: string;
    description?: string;
    max_capacity: number;
    registered_count: number;
    created_at?: Date | string;
    updated_at?: Date | string;
    requires_ticket?: boolean;

    //IMAGEM NÃO PÔDE SER INCLUIDA, POIS API NÃO SUPORTA IMAGEM!
    // images?: { id: number, file_url: string }[];
    }