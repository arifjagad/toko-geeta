// types.ts
export interface Game {
    name: string;
    picture: string;
    pictureBanner: string;
    guide: string[];
    packages: {
        type: string;
        iconCurrency: string;
        options: {
            id: number;
            nameOption: string;
            price: number;
        }[];
    }[];
}
