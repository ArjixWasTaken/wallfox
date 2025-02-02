export type SearchResults = {
    data: Data[];
    meta: Meta;
} & Record<string, undefined>;

export interface Data {
    id: string;
    url: string;
    short_url: string;
    views: number;
    favorites: number;
    source: string;
    purity: Purity;
    category: Category;
    dimension_x: number;
    dimension_y: number;
    resolution: string;
    ratio: string;
    file_size: number;
    file_type: FileType;
    created_at: Date;
    colors: string[];
    path: string;
    thumbs: Thumbs;
}

export type Category = "general" | "anime" | "people";
export type FileType = "image/jpeg" | "image/png";
export type Purity = "sfw" | "sketchy" | "nsfw";

export interface Thumbs {
    large: string;
    original: string;
    small: string;
}

export interface Meta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    query: null;
    seed: null;
}
