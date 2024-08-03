const predefinedSetsA1 = {
    easy: [
        [
            { left: 1, right: 2 }, { left: 3, right: 4 }, { left: 2, right: 5 },
            { left: 6, right: 4 }, { left: 3, right: 5 }, { left: 7, right: 6 },
            { left: 5, right: 3 }
        ],
        [
            { left: 4, right: 5 }, { left: 6, right: 3 }, { left: 1, right: 3 },
            { left: 7, right: 5 }, { left: 2, right: 4 }, { left: 6, right: 2 },
            { left: 5, right: 7 }
        ],
        [
            { left: 3, right: 2 }, { left: 5, right: 6 }, { left: 4, right: 1 },
            { left: 7, right: 6 }, { left: 3, right: 7 }, { left: 2, right: 5 },
            { left: 4, right: 3 }
        ],
        [
            { left: 2, right: 4 }, { left: 1, right: 3 }, { left: 6, right: 5 },
            { left: 3, right: 7 }, { left: 5, right: 6 }, { left: 4, right: 7 },
            { left: 6, right: 2 }
        ],
        [
            { left: 7, right: 4 }, { left: 3, right: 5 }, { left: 2, right: 6 },
            { left: 5, right: 7 }, { left: 1, right: 4 }, { left: 6, right: 3 },
            { left: 4, right: 2 }
        ],
        [
            { left: 4, right: 1 }, { left: 5, right: 3 }, { left: 6, right: 2 },
            { left: 7, right: 5 }, { left: 2, right: 3 }, { left: 3, right: 6 },
            { left: 1, right: 7 }
        ],
        [
            { left: 6, right: 4 }, { left: 5, right: 2 }, { left: 3, right: 7 },
            { left: 4, right: 1 }, { left: 7, right: 3 }, { left: 2, right: 6 },
            { left: 1, right: 5 }
        ],
        [
            { left: 2, right: 5 }, { left: 4, right: 6 }, { left: 3, right: 7 },
            { left: 5, right: 1 }, { left: 7, right: 2 }, { left: 6, right: 3 },
            { left: 1, right: 4 }
        ],
        [
            { left: 3, right: 6 }, { left: 4, right: 7 }, { left: 1, right: 2 },
            { left: 6, right: 5 }, { left: 5, right: 4 }, { left: 2, right: 3 },
            { left: 7, right: 1 }
        ],
        [
            { left: 5, right: 7 }, { left: 2, right: 1 }, { left: 3, right: 6 },
            { left: 4, right: 3 }, { left: 1, right: 5 }, { left: 7, right: 2 },
            { left: 6, right: 4 }
        ]
    ],
    hard: [
        [
            { left: 5, right: 4 }, { left: 3, right: 3 }, { left: 4, right: 6 },
            { left: 2, right: 2 }, { left: 6, right: 6 }, { left: 7, right: 6 },
            { left: 1, right: 3 }
        ],
        [
            { left: 4, right: 5 }, { left: 4, right: 4 }, { left: 3, right: 2 },
            { left: 7, right: 7 }, { left: 2, right: 2 }, { left: 5, right: 6 },
            { left: 4, right: 3 }
        ],
        [
            { left: 5, right: 3 }, { left: 2, right: 2 }, { left: 3, right: 6 },
            { left: 7, right: 5 }, { left: 6, right: 6 }, { left: 4, right: 4 },
            { left: 3, right: 4 }
        ],
        [
            { left: 2, right: 1 }, { left: 6, right: 6 }, { left: 5, right: 7 },
            { left: 3, right: 3 }, { left: 4, right: 4 }, { left: 7, right: 6 },
            { left: 2, right: 5 }
        ],
        [
            { left: 5, right: 5 }, { left: 6, right: 7 }, { left: 2, right: 2 },
            { left: 3, right: 2 }, { left: 4, right: 4 }, { left: 7, right: 5 },
            { left: 1, right: 3 }
        ],
        [
            { left: 5, right: 3 }, { left: 7, right: 7 }, { left: 4, right: 6 },
            { left: 6, right: 6 }, { left: 2, right: 2 }, { left: 3, right: 7 },
            { left: 1, right: 4 }
        ],
        [
            { left: 4, right: 2 }, { left: 3, right: 3 }, { left: 6, right: 5 },
            { left: 2, right: 2 }, { left: 7, right: 7 }, { left: 5, right: 6 },
            { left: 3, right: 4 }
        ],
        [
            { left: 6, right: 5 }, { left: 7, right: 7 }, { left: 4, right: 3 },
            { left: 2, right: 2 }, { left: 5, right: 6 }, { left: 3, right: 3 },
            { left: 4, right: 7 }
        ],
        [
            { left: 4, right: 4 }, { left: 6, right: 7 }, { left: 5, right: 3 },
            { left: 3, right: 3 }, { left: 2, right: 2 }, { left: 7, right: 6 },
            { left: 1, right: 4 }
        ],
        [
            { left: 2, right: 1 }, { left: 6, right: 7 }, { left: 5, right: 5 },
            { left: 3, right: 3 }, { left: 4, right: 4 }, { left: 7, right: 6 },
            { left: 2, right: 5 }
        ]
    ]
};

const predefinedSetsA2 = {
    easy: [
        [
            { first: 1, second: 2 }, { first: 3, second: 5 }, { first: 4, second: 4 },
            { first: 6, second: 6 }, { first: 7, second: 3 }, { first: 2, second: 8 },
            { first: 9, second: 7 }
        ],
        [
            { first: 4, second: 5 }, { first: 6, second: 6 }, { first: 1, second: 3 },
            { first: 7, second: 5 }, { first: 2, second: 2 }, { first: 9, second: 4 },
            { first: 8, second: 10 }
        ],
        [
            { first: 3, second: 3 }, { first: 5, second: 6 }, { first: 4, second: 1 },
            { first: 7, second: 8 }, { first: 6, second: 6 }, { first: 2, second: 5 },
            { first: 10, second: 9 }
        ],
        [
            { first: 2, second: 4 }, { first: 1, second: 1 }, { first: 6, second: 7 },
            { first: 3, second: 5 }, { first: 5, second: 5 }, { first: 4, second: 9 },
            { first: 8, second: 7 }
        ],
        [
            { first: 7, second: 4 }, { first: 3, second: 3 }, { first: 2, second: 6 },
            { first: 5, second: 8 }, { first: 1, second: 4 }, { first: 6, second: 2 },
            { first: 9, second: 7 }
        ],
        [
            { first: 4, second: 1 }, { first: 5, second: 5 }, { first: 6, second: 3 },
            { first: 7, second: 6 }, { first: 2, second: 2 }, { first: 3, second: 9 },
            { first: 10, second: 8 }
        ],
        [
            { first: 6, second: 4 }, { first: 5, second: 2 }, { first: 3, second: 7 },
            { first: 4, second: 1 }, { first: 7, second: 3 }, { first: 2, second: 6 },
            { first: 8, second: 10 }
        ],
        [
            { first: 2, second: 5 }, { first: 4, second: 4 }, { first: 3, second: 7 },
            { first: 5, second: 1 }, { first: 7, second: 2 }, { first: 6, second: 3 },
            { first: 9, second: 8 }
        ],
        [
            { first: 3, second: 6 }, { first: 4, second: 4 }, { first: 1, second: 2 },
            { first: 6, second: 5 }, { first: 7, second: 7 }, { first: 2, second: 3 },
            { first: 10, second: 9 }
        ],
        [
            { first: 5, second: 7 }, { first: 2, second: 2 }, { first: 3, second: 6 },
            { first: 4, second: 4 }, { first: 1, second: 5 }, { first: 8, second: 3 },
            { first: 9, second: 10 }
        ]
    ],
    hard: [
        [
            { first: 5, second: 4 }, { first: 3, second: 3 }, { first: 4, second: 6 },
            { first: 2, second: 2 }, { first: 6, second: 6 }, { first: 7, second: 6 },
            { first: 1, second: 3 }
        ],
        [
            { first: 4, second: 5 }, { first: 4, second: 4 }, { first: 3, second: 2 },
            { first: 7, second: 7 }, { first: 2, second: 2 }, { first: 5, second: 6 },
            { first: 4, second: 3 }
        ],
        [
            { first: 5, second: 3 }, { first: 2, second: 2 }, { first: 3, second: 6 },
            { first: 7, second: 5 }, { first: 6, second: 6 }, { first: 4, second: 4 },
            { first: 3, second: 4 }
        ],
        [
            { first: 2, second: 1 }, { first: 6, second: 6 }, { first: 5, second: 7 },
            { first: 3, second: 3 }, { first: 4, second: 4 }, { first: 7, second: 6 },
            { first: 2, second: 5 }
        ],
        [
            { first: 5, second: 5 }, { first: 6, second: 7 }, { first: 2, second: 2 },
            { first: 3, second: 2 }, { first: 4, second: 4 }, { first: 7, second: 5 },
            { first: 1, second: 3 }
        ],
        [
            { first: 5, second: 3 }, { first: 7, second: 7 }, { first: 4, second: 6 },
            { first: 6, second: 6 }, { first: 2, second: 2 }, { first: 3, second: 7 },
            { first: 1, second: 4 }
        ],
        [
            { first: 4, second: 2 }, { first: 3, second: 3 }, { first: 6, second: 5 },
            { first: 2, second: 2 }, { first: 7, second: 7 }, { first: 5, second: 6 },
            { first: 3, second: 4 }
        ],
        [
            { first: 6, second: 5 }, { first: 7, second: 7 }, { first: 4, second: 3 },
            { first: 2, second: 2 }, { first: 5, second: 6 }, { first: 3, second: 3 },
            { first: 4, second: 7 }
        ],
        [
            { first: 4, second: 4 }, { first: 6, second: 7 }, { first: 5, second: 3 },
            { first: 3, second: 3 }, { first: 2, second: 2 }, { first: 7, second: 6 },
            { first: 1, second: 4 }
        ],
        [
            { first: 2, second: 1 }, { first: 6, second: 7 }, { first: 5, second: 5 },
            { first: 3, second: 3 }, { first: 4, second: 4 }, { first: 7, second: 6 },
            { first: 2, second: 5 }
        ]
    ]
};

export { predefinedSetsA1, predefinedSetsA2 };