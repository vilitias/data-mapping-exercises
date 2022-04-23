import React, { useState, useEffect } from 'react';
import './App.css';
import { joinCategoryStatsForView } from './mappers/join-category-stats';
import { mockData, USER_BASE } from './mock-data/join-category-stats';

function App() {
    const [currentTab, setCurrentTab] = useState<USER_BASE>();
    // console.log(mockData.categoryStats, 'CATEGORY stats');
    // console.log(mockData.categories, 'CATEGORY');
    const categoryStatsForView = joinCategoryStatsForView(mockData);

    return (
        <div className="App">
            <div className="tab-container">
                <button className="tab-button" onClick={() => setCurrentTab(USER_BASE.EUROPE)}>
                    {USER_BASE.EUROPE}
                </button>
                <button className="tab-button" onClick={() => setCurrentTab(USER_BASE.ASIA)}>
                    {USER_BASE.ASIA}
                </button>
                <button className="tab-button" onClick={() => setCurrentTab(USER_BASE.US)}>
                    {USER_BASE.US}
                </button>
            </div>
            <div className="categories">
                {/* {mockData.categories.map((cat) => {
                    return (
                        <div key={cat.id}>
                            {cat.label},{cat.userBase}
                        </div>
                    );
                })} */}

                {/* {mockData.categoryTypes.map((cat) => {
                    return (
                        <div className="category-type" key={cat.id}>
                            <div className="category-type-title">{cat.label}</div>
                            <div>
                                {mockData.categories
                                    .filter((ctg) => {
                                        return ctg.userBase === currentTab && ctg.typeId === cat.id;
                                    })
                                    .map((ctg) => {
                                        return <div>{ctg.label}</div>;
                                    })}
                            </div>
                        </div>
                    );
                })} */}
            </div>
        </div>
    );
}

export default App;
