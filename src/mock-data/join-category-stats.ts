export enum USER_BASE {
    EUROPE = 'EUROPE',
    ASIA = 'ASIA',
    US = 'US',
}

export const USER_BASE_LABELS = {
    [USER_BASE.EUROPE]: 'Europe',
    [USER_BASE.ASIA]: 'Asia',
    [USER_BASE.US]: 'United States',
};

export type CategoryTypeDto = {
    id: string;
    label: string;
};

export type CategoryDto = {
    id: string;
    label: string;
    typeId: string;
    userBase: USER_BASE;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
};

export type CategoryStatsDto = {
    id: string;
    categoryId: string;
    finishedItemCount: number;
    totalItemCount: number;
};

export type CategoriesForView = {
    // display tabs for each userBase, grey-out tabs that don't have items
    [userBase in USER_BASE]: {
        // display section for each category type
        [typeId: string]: {
            id: string;
            label: string;
            // display totals for each category type
            finishedItemCount: number;
            totalItemCount: number;
            finishedPercentage: number;
            // display each category with all relevant information
            items: {
                id: string;
                label: string;
                typeId: string;
                userBase: USER_BASE;
                createdAt: string;
                updatedAt: string;
                deletedAt?: string | null;
                finishedItemCount: number;
                totalItemCount: number;
                finishedPercentage: number;
            }[];
        };
    };
};
