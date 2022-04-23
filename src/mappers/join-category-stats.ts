import {
    CategoriesForView,
    CategoryDto,
    CategoryStatsDto,
    CategoryTypeDto,
    mockData,
    USER_BASE,
} from '../mock-data/join-category-stats';

export const joinCategoryStatsForView = ({
    categories,
    categoryStats,
    categoryTypes,
}: {
    categories: CategoryDto[];
    categoryTypes: CategoryTypeDto[];
    categoryStats: CategoryStatsDto[];
}): CategoriesForView => {
    const categoriesForView: any = {};

    Object.keys(USER_BASE).forEach((base, i) => {
        categoriesForView[base] = {};

        mockData.categoryTypes.forEach((categoryType, idx) => {
            categoriesForView[base][categoryType.id] = {};
            categoriesForView[base][categoryType.id].id = categoryType.id;
            categoriesForView[base][categoryType.id].label = categoryType.label;
            categoriesForView[base][categoryType.id].soldItemCount = 0;
            categoriesForView[base][categoryType.id].totalItemCount = 0;
            categoriesForView[base][categoryType.id].items = [];

            mockData.categories.forEach((category) => {
                mockData.categoryStats.forEach((catStat) => {
                    if (
                        category.typeId === categoryType.id &&
                        category.userBase === base &&
                        catStat.categoryId === category.id
                    ) {
                        categoriesForView[base][categoryType.id].soldItemCount += catStat.soldItemCount;
                        categoriesForView[base][categoryType.id].totalItemCount += catStat.totalItemCount;
                        categoriesForView[base][categoryType.id].items.push({
                            id: category.id,
                            label: category.label,
                            typeId: category.typeId,
                            userBase: category.userBase,
                            createdAt: category.createdAt,
                            updatedAt: category.updatedAt,
                            deletedAt: category.deletedAt,
                            price: category.price,
                            soldItemCount: catStat.soldItemCount,
                            totalItemCount: catStat.totalItemCount,
                            soldPercentage: +((100 * catStat.soldItemCount) / catStat.totalItemCount).toFixed(
                                2
                            ),
                        });
                    }
                });
            });
            categoriesForView[base][categoryType.id].soldPercentage = +(
                (100 * categoriesForView[base][categoryType.id].soldItemCount) /
                categoriesForView[base][categoryType.id].totalItemCount
            ).toFixed(2);
        });
    });
    console.log(categoriesForView);

    // @ts-ignore
    return categoriesForView;
};
