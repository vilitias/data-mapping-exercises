import faker from 'faker';

export enum USER_BASE {
    EUROPE = 'EUROPE',
    ASIA = 'ASIA',
    US = 'US',
}

export const USER_BASE_LABELS: {
    [key in USER_BASE]: string;
} = {
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
    userBase: USER_BASE; //1
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    price: string;
};

export type CategoryStatsDto = {
    id: string;
    categoryId: string;
    soldItemCount: number;
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
            soldItemCount: number;
            totalItemCount: number;
            soldPercentage: number;
            // display each category with all relevant information
            items: {
                id: string;
                label: string;
                typeId: string;
                userBase: USER_BASE;
                createdAt: string;
                updatedAt: string;
                deletedAt?: string | null;
                price: string;
                soldItemCount: number;
                totalItemCount: number;
                soldPercentage: number;
            }[];
        };
    };
};

faker.seed(0);

const categoryTypeIds: CategoryTypeDto['id'][] = new Array(25)
    .fill(null)
    .map((): string => faker.unique(faker.datatype.uuid, undefined, { maxRetries: 10 }));
const categoryTypes: CategoryTypeDto[] = categoryTypeIds.map((id) => ({
    id,
    label: faker.unique(faker.animal.cow, undefined, { maxRetries: 10, maxTime: 50 }),
}));
const categoryIds: CategoryDto['id'][] = new Array(200)
    .fill(null)
    .map((): string => faker.unique(faker.datatype.uuid, undefined, { maxRetries: 10 }));
const categoryStats: CategoryStatsDto[] = categoryIds.map((id): CategoryStatsDto => {
    const total = +faker.finance.amount(100, 150, 0);
    return {
        id: faker.datatype.uuid(),
        categoryId: id,
        soldItemCount: +faker.finance.amount(0, total, 0),
        totalItemCount: total,
    };
});
const categories: CategoryDto[] = categoryIds.map((id): CategoryDto => {
    const deletedAt = faker.date.between(new Date('2000-01-01'), new Date('2020-01-01'));
    const updatedAt = faker.date.between(new Date('2000-01-01'), deletedAt);
    const createdAt = faker.date.between(new Date('2000-01-01'), updatedAt);
    return {
        id,
        label: faker.unique(faker.commerce.productName, undefined, { maxRetries: 10 }),
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
        deletedAt: faker.random.arrayElement([deletedAt.toISOString(), null, null, null, null]),
        userBase: faker.random.arrayElement([USER_BASE.ASIA, USER_BASE.EUROPE, USER_BASE.US]),
        typeId: faker.random.arrayElement(categoryTypeIds),
        price: faker.finance.amount(5, 10000000, 2),
    };
});

export const mockData: {
    categoryTypes: CategoryTypeDto[];
    categories: CategoryDto[];
    categoryStats: CategoryStatsDto[];
} = {
    categoryTypes,
    categoryStats,
    categories,
};
