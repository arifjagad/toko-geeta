// types.ts
export interface Game {
    name: string;
    packages: {
        type: string;
        options: {
            id: number;
            nameOption: string;
            price: number;
        }[];
    }[];
}
