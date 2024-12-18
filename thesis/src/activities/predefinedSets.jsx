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
            { first: 3, second: 6 }, { first: 4, second: 4 }, { first: 1, second: 6 },
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
            { first: 5, second: 4 }, { first: 8, second: 3 }, { first: 4, second: 6 },
            { first: 2, second: 2 }, { first: 6, second: 6 }, { first: 7, second: 6 },
            { first: 1, second: 3 }
        ],
        [
            { first: 4, second: 8 }, { first: 4, second: 4 }, { first: 3, second: 2 },
            { first: 7, second: 7 }, { first: 2, second: 9 }, { first: 3, second: 6 },
            { first: 4, second: 3 }
        ],
        [
            { first: 5, second: 3 }, { first: 2, second: 2 }, { first: 3, second: 6 },
            { first: 7, second: 5 }, { first: 6, second: 9 }, { first: 4, second: 4 },
            { first: 3, second: 4 }
        ],
        [
            { first: 2, second: 1 }, { first: 9, second: 6 }, { first: 5, second: 7 },
            { first: 3, second: 3 }, { first: 4, second: 4 }, { first: 7, second: 6 },
            { first: 2, second: 5 }
        ],
        [
            { first: 5, second: 1 }, { first: 6, second: 7 }, { first: 2, second: 2 },
            { first: 3, second: 8 }, { first: 4, second: 4 }, { first: 7, second: 5 },
            { first: 1, second: 8 }
        ],
        [
            { first: 5, second: 3 }, { first: 7, second: 7 }, { first: 1, second: 6 },
            { first: 6, second: 6 }, { first: 2, second: 6 }, { first: 3, second: 7 },
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
            { first: 6, second: 3 }, { first: 2, second: 2 }, { first: 7, second: 6 },
            { first: 1, second: 4 }
        ],
        [
            { first: 2, second: 1 }, { first: 6, second: 7 }, { first: 5, second: 5 },
            { first: 3, second: 3 }, { first: 8, second: 2 }, { first: 7, second: 6 },
            { first: 2, second: 5 }
        ]
    ]
};

const predefinedSetsA3 = {
    easy: [
        [
            { left: 1, right: 2 }, { left: 25, right: 28 }, { left: 3, right: 9 },
            { left: 17, right: 14 }, { left: 12, right: 12 }, { left: 3, right: 3 },
            { left: 6, right: 2 }
        ],
        [
            { left: 9, right: 1 }, { left: 19, right: 10 }, { left: 23, right: 23 },
            { left: 16, right: 19 }, { left: 11, right: 18 }, { left: 24, right: 21 },
            { left: 27, right: 21 }
        ],
        [
            { left: 4, right: 6 }, { left: 10, right: 16 }, { left: 19, right: 20 },
            { left: 12, right: 14 }, { left: 25, right: 23 }, { left: 29, right: 29 },
            { left: 21, right: 22 }
        ],
        [
            { left: 7, right: 7 }, { left: 10, right: 16 }, { left: 13, right: 11 },
            { left: 14, right: 15 }, { left: 26, right: 24 }, { left: 1, right: 3 },
            { left: 27, right: 27 }
        ],
        [
            { left: 5, right: 9 }, { left: 14, right: 10 }, { left: 29, right: 22 },
            { left: 18, right: 18 }, { left: 22, right: 24 }, { left: 20, right: 25 },
            { left: 27, right: 28 }
        ],
        [
            { left: 2, right: 4 }, { left: 11, right: 10 }, { left: 13, right: 18 },
            { left: 15, right: 12 }, { left: 20, right: 21 }, { left: 26, right: 26 },
            { left: 21, right: 28 }
        ],
        [
            { left: 3, right: 6 }, { left: 20, right: 21 }, { left: 13, right: 13 },
            { left: 17, right: 19 }, { left: 22, right: 27 }, { left: 27, right: 28 },
            { left: 14, right: 13 }
        ],
        [
            { left: 4, right: 7 }, { left: 24, right: 20 }, { left: 24, right: 23 },
            { left: 12, right: 12 }, { left: 5, right: 8 }, { left: 15, right: 19 },
            { left: 13, right: 11 }
        ],
        [
            { left: 6, right: 8 }, { left: 11, right: 11 }, { left: 20, right: 24 },
            { left: 27, right: 23 }, { left: 26, right: 29 }, { left: 16, right: 17 },
            { left: 17, right: 16 }
        ],
        [
            { left: 7, right: 9 }, { left: 15, right: 10 }, { left: 4, right: 4 },
            { left: 20, right: 22 }, { left: 28, right: 26 }, { left: 13, right: 13 },
            { left: 12, right: 17 }
        ]
    ],
    hard: [
        [
            { left: 1, right: 3 }, { left: 10, right: 2 }, { left: 20, right: 17 },
            { left: 16, right: 19 }, { left: 9, right: 12 }, { left: 18, right: 26 },
            { left: 18, right: 18 }
        ],
        [
            { left: 9, right: 6 }, { left: 7, right: 20 }, { left: 29, right: 27 },
            { left: 14, right: 22 }, { left: 21, right: 19 }, { left: 23, right: 23 },
            { left: 1, right: 19 }
        ],
        [
            { left: 8, right: 5 }, { left: 10, right: 8 }, { left: 21, right: 12 },
            { left: 23, right: 25 }, { left: 12, right: 12 }, { left: 19, right: 21 },
            { left: 25, right: 17 }
        ],
        [
            { left: 7, right: 9 }, { left: 18, right: 29 }, { left: 6, right: 6 },
            { left: 14, right: 23 }, { left: 25, right: 18 }, { left: 11, right: 2 },
            { left: 19, right: 20 }
        ],
        [
            { left: 5, right: 8 }, { left: 12, right: 4 }, { left: 12, right: 17 },
            { left: 21, right: 19 }, { left: 27, right: 19 }, { left: 24, right: 18 },
            { left: 17, right: 17 }
        ],
        [
            { left: 4, right: 3 }, { left: 4, right: 20 }, { left: 14, right: 22 },
            { left: 16, right: 16 }, { left: 16, right: 21 }, { left: 8, right: 18 },
            { left: 9, right: 28 }
        ],
        [
            { left: 6, right: 7 }, { left: 20, right: 11 }, { left: 24, right: 26 },
            { left: 27, right: 27 }, { left: 8, right: 15 }, { left: 2, right: 24 },
            { left: 4, right: 13 }
        ],
        [
            { left: 5, right: 4 }, { left: 8, right: 10 }, { left: 15, right: 23 },
            { left: 22, right: 24 }, { left: 26, right: 26 }, { left: 9, right: 17 },
            { left: 1, right: 20 }
        ],
        [
            { left: 2, right: 1 }, { left: 20, right: 2 }, { left: 3, right: 21 },
            { left: 22, right: 24 }, { left: 9, right: 27 }, { left: 15, right: 6 },
            { left: 19, right: 19 }
        ],
        [
            { left: 9, right: 8 }, { left: 10, right: 9 }, { left: 7, right: 25 },
            { left: 11, right: 8 }, { left: 21, right: 21 }, { left: 4, right: 12 },
            { left: 20, right: 7 }
        ]
    ]
};

const predefinedSetsA5 = {
    easy: [
        [
            { largeNum: 50, smallNum: 20 }, { largeNum: 75, smallNum: 24 }, { largeNum: 90, smallNum: 38 },
            { largeNum: 63, smallNum: 16 }, { largeNum: 96, smallNum: 68 }
        ],
        [
            { largeNum: 70, smallNum: 20 }, { largeNum: 95, smallNum: 42 }, { largeNum: 62, smallNum: 25 },
            { largeNum: 87, smallNum: 34 }, { largeNum: 71, smallNum: 25 }
        ],
        [
            { largeNum: 55, smallNum: 25 }, { largeNum: 56, smallNum: 25 }, { largeNum: 90, smallNum: 31 },
            { largeNum: 41, smallNum: 16 }, { largeNum: 36, smallNum: 29 }
        ],
        [
            { largeNum: 20, smallNum: 15 }, { largeNum: 66, smallNum: 41 }, { largeNum: 64, smallNum: 27 },
            { largeNum: 42, smallNum: 34 }, { largeNum: 72, smallNum: 31 }
        ],
        [
            { largeNum: 50, smallNum:42 }, { largeNum: 77, smallNum: 17 }, { largeNum: 51, smallNum: 32 },
            { largeNum: 62, smallNum: 17 }, { largeNum: 82, smallNum: 37 }
        ],
        [
            { largeNum: 10, smallNum: 2 }, { largeNum: 97, smallNum: 47 }, { largeNum: 70, smallNum: 28 },
            { largeNum: 62, smallNum: 35 }, { largeNum: 45, smallNum: 18 }
        ],
        [
            { largeNum: 17, smallNum: 10 }, { largeNum: 78, smallNum: 28 }, { largeNum: 83, smallNum: 61 },
            { largeNum: 63, smallNum: 18 }, { largeNum: 83, smallNum: 38 }
        ],
        [
            { largeNum: 23, smallNum: 13 }, { largeNum: 58, smallNum: 43 }, { largeNum: 71, smallNum: 29 },
            { largeNum: 91, smallNum: 36 }, { largeNum: 62, smallNum: 13 }
        ],
        [
            { largeNum: 10, smallNum: 8 }, { largeNum: 50, smallNum: 35 }, { largeNum: 57, smallNum: 34 },
            { largeNum: 64, smallNum: 19 }, { largeNum: 74, smallNum: 59 }
        ],
        [
            { largeNum: 30, smallNum: 15 }, { largeNum: 50, smallNum: 43 }, { largeNum: 72, smallNum: 30 },
            { largeNum: 92, smallNum: 37 }, { largeNum: 83, smallNum: 34 }
        ]
    ],
    hard: [
        [
            { largeNum: 200, smallNum: 150 }, { largeNum: 305, smallNum: 250 }, { largeNum: 451, smallNum: 438 },
            { largeNum: 624, smallNum: 571 }, { largeNum: 867, smallNum: 489 }
        ],
        [
            { largeNum: 220, smallNum: 170 }, { largeNum: 320, smallNum: 275 }, { largeNum: 565, smallNum: 517 },
            { largeNum: 625, smallNum: 511 }, { largeNum: 811, smallNum: 618 }
        ],
        [
            { largeNum: 240, smallNum: 180 }, { largeNum: 340, smallNum: 285 }, { largeNum: 976, smallNum: 917 },
            { largeNum: 629, smallNum: 101 }, { largeNum: 991, smallNum: 624 }
        ],
        [
            { largeNum: 260, smallNum: 190 }, { largeNum: 365, smallNum: 290 }, { largeNum: 182, smallNum: 124 },
            { largeNum: 931, smallNum: 540 }, { largeNum: 824, smallNum: 635 }
        ],
        [
            { largeNum: 280, smallNum: 200 }, { largeNum: 380, smallNum: 305 }, { largeNum: 236, smallNum: 207 },
            { largeNum: 999, smallNum: 320 }, { largeNum: 276, smallNum: 134 }
        ],
        [
            { largeNum: 300, smallNum: 210 }, { largeNum: 400, smallNum: 315 }, { largeNum: 533, smallNum: 505 },
            { largeNum: 233, smallNum: 190 }, { largeNum: 501, smallNum: 112 }
        ],
        [
            { largeNum: 320, smallNum: 220 }, { largeNum: 425, smallNum: 320 }, { largeNum: 887, smallNum: 818 },
            { largeNum: 665, smallNum: 421 }, { largeNum: 865, smallNum: 628 }
        ],
        [
            { largeNum: 340, smallNum: 230 }, { largeNum: 445, smallNum: 330 }, { largeNum: 364, smallNum: 327 },
            { largeNum: 670, smallNum: 568 }, { largeNum: 943, sallNum: 677 }
        ],
        [
            { largeNum: 360, smallNum: 240 }, { largeNum: 465, smallNum: 340 }, { largeNum: 732, smallNum: 709 },
            { largeNum: 689, smallNum: 447 }, { largeNum: 586, smallNum: 408 }
        ],
        [
            { largeNum: 380, smallNum: 250 }, { largeNum: 485, smallNum: 350 }, { largeNum: 843, smallNum: 806 },
            { largeNum: 702, smallNum: 311 }, { largeNum: 781, smallNum: 695 }
        ]
    ]
};

const predefinedSetsA6 = {
    easy: [
        [
            { left: 3, right: 1 }, { left: 28, right: 25 }, { left: 9, right: 3 },
            { left: 17, right: 14 }, { left: 23, right: 12 }, { left: 6, right: 2 },
            { left: 16, right: 4 }
        ],
        [
            { left: 9, right: 1 }, { left: 16, right: 10 }, { left: 22, right: 12 },
            { left: 19, right: 16 }, { left: 18, right: 11 }, { left: 24, right: 12 },
            { left: 27, right: 21 }
        ],
        [
            { left: 6, right: 4 }, { left: 14, right: 10 }, { left: 24, right: 14 },
            { left: 19, right: 12 }, { left: 25, right: 23 }, { left: 9, right: 5 },
            { left: 21, right: 10 }
        ],
        [
            { left: 9, right: 2 }, { left: 11, right: 10 }, { left: 17, right: 11 },
            { left: 25, right: 24 }, { left: 26, right: 14 }, { left: 3, right: 1 },
            { left: 27, right: 15 }
        ],
        [
            { left: 9, right: 5 }, { left: 14, right: 10 }, { left: 29, right: 22 },
            { left: 28, right: 8 }, { left: 14, right: 12 }, { left: 25, right: 14 },
            { left: 18, right: 7 }
        ],
        [
            { left: 4, right: 2 }, { left: 12, right: 10 }, { left: 18, right: 13 },
            { left: 25, right: 22 }, { left: 25, right: 13 }, { left: 8, right: 5 },
            { left: 25, right: 13 }
        ],
        [
            { left: 6, right: 3 }, { left: 21, right: 20 }, { left: 19, right: 13 },
            { left: 26, right: 25 }, { left: 28, right: 15 }, { left: 17, right: 14 },
            { left: 27, right: 2 }
        ],
        [
            { left: 7, right: 4 }, { left: 24, right: 20 }, { left: 23, right: 22 },
            { left: 17, right: 11 }, { left: 8, right: 5 }, { left: 19, right: 3 },
            { left: 27, right: 11 }
        ],
        [
            { left: 8, right: 6 }, { left: 22, right: 20 }, { left: 24, right: 21 },
            { left: 17, right: 13 }, { left: 29, right: 18 }, { left: 27, right: 20 },
            { left: 18, right: 4 }
        ],
        [
            { left: 9, right: 7 }, { left: 15, right: 10 }, { left: 16, right: 14 },
            { left: 28, right: 24 }, { left: 28, right: 15 }, { left: 17, right: 13 },
            { left: 20, right: 3 }
        ]
    ],
    hard: [
        [
            { left: 9, right: 3 }, { left: 10, right: 2 }, { left: 21, right: 7 },
            { left: 19, right: 6 }, { left: 12, right: 9 }, { left: 26, right: 8 },
            { left: 28, right: 9 }
        ],
        [
            { left: 9, right: 6 }, { left: 20, right: 17 }, { left: 23, right: 17 },
            { left: 22, right: 1 }, { left: 21, right: 19 }, { left: 23, right: 7 },
            { left: 18, right: 9 }
        ],
        [
            { left: 8, right: 5 }, { left: 10, right: 8 }, { left: 21, right: 12 },
            { left: 25, right: 3 }, { left: 14, right: 7 }, { left: 21, right: 9 },
            { left: 25, right: 17 }
        ],
        [
            { left: 9, right: 7 }, { left: 20, right: 18 }, { left: 16, right: 8 },
            { left: 25, right: 4 }, { left: 25, right: 18 }, { left: 11, right: 2 },
            { left: 20, right: 19 }
        ],
        [
            { left: 7, right: 5 }, { left: 10, right: 4 }, { left: 17, right: 8 },
            { left: 29, right: 14 }, { left: 27, right: 19 }, { left: 24, right: 18 },
            { left: 20, right: 15 }
        ],
        [
            { left: 4, right: 3 }, { left: 20, right: 14 }, { left: 22, right: 14 },
            { left: 29, right: 1 }, { left: 21, right: 16 }, { left: 22, right: 8 },
            { left: 28, right: 9 }
        ],
        [
            { left: 7, right: 1 }, { left: 20, right: 11 }, { left: 26, right: 14 },
            { left: 27, right: 3 }, { left: 15, right: 8 }, { left: 21, right: 2 },
            { left: 13, right: 4 }
        ],
        [
            { left: 5, right: 2 }, { left: 10, right: 1 }, { left: 23, right: 15 },
            { left: 24, right: 3 }, { left: 26, right: 19 }, { left: 17, right: 9 },
            { left: 20, right: 1 }
        ],
        [
            { left: 2, right: 1 }, { left: 20, right: 17 }, { left: 21, right: 3 },
            { left: 28, right: 1 }, { left: 17, right: 9 }, { left: 15, right: 6 },
            { left: 20, right: 19 }
        ],
        [
            { left: 9, right: 1 }, { left: 10, right: 9 }, { left: 25, right: 7 },
            { left: 27, right: 5 }, { left: 21, right: 13 }, { left: 22, right: 15 },
            { left: 10, right: 3 }
        ]
    ]
};

const predefinedSetsA7 = {
    easy: [
        [
            { large: 428, small: 123 },
            { large: 673, small: 289 },
            { large: 564, small: 375 },
            { large: 842, small: 831 },
            { large: 922, small: 729 }
        ],
        [
            { large: 356, small: 145 },
            { large: 682, small: 274 },
            { large: 511, small: 382 },
            { large: 714, small: 707 },
            { large: 835, small: 536 }
        ],
        [
            { large: 459, small: 238 },
            { large: 682, small: 345 },
            { large: 574, small: 487 },
            { large: 802, small: 791 },
            { large: 813, small: 616 }
        ],
        [
            { large: 479, small: 259 },
            { large: 639, small: 348 },
            { large: 857, small: 376 },
            { large: 894, small: 815 },
            { large: 791, small: 593 }
        ],
        [
            { large: 989, small: 264 },
            { large: 653, small: 344 },
            { large: 131, small: 89 },
            { large: 274, small: 239 },
            { large: 213, small: 117 }
        ],
        [
            { large: 737, small: 117 },
            { large: 691, small: 354 },
            { large: 523, small: 99 },
            { large: 818, small: 799 },
            { large: 780, small: 281 }
        ],
        [
            { large: 465, small: 223 },
            { large: 783, small: 379 },
            { large: 943, small: 857 },
            { large: 432, small: 389 },
            { large: 610, small: 517 }
        ],
        [
            { large: 856, small: 754 },
            { large: 514, small: 362 },
            { large: 533, small: 56 },
            { large: 807, small: 719 },
            { large: 991, small: 393 }
        ],
        [
            { large: 419, small: 402 },
            { large: 642, small: 318 },
            { large: 567, small: 289 },
            { large: 913, small: 756 },
            { large: 720, small: 125 }
        ],
        [
            { large: 448, small: 231 },
            { large: 991, small: 349 },
            { large: 633, small: 174 },
            { large: 804, small: 617 },
            { large: 844, small: 645 }
        ]
    ],
    hard: [
        [
            { large: 8824, small: 1234 },
            { large: 6731, small: 2890 },
            { large: 5600, small: 3499 },
            { large: 8425, small: 7524 },
            { large: 7085, small: 5094 }
        ],
        [
            { large: 5296, small: 2147 },
            { large: 6487, small: 3749 },
            { large: 9812, small: 4578 },
            { large: 8901, small: 7910 },
            { large: 9642, small: 9463 }
        ],
        [
            { large: 4931, small: 3341 },
            { large: 9784, small: 4827 },
            { large: 5400, small: 4218 },
            { large: 3564, small: 2582 },
            { large: 7300, small: 6199 }
        ],
        [
            { large: 7570, small: 1432 },
            { large: 4359, small: 2881 },
            { large: 9900, small: 4789 },
            { large: 4430, small: 1701 },
            { large: 7524, small: 5591 }
        ],
        [
            { large: 9128, small: 8163 },
            { large: 6982, small: 5499 },
            { large: 4713, small: 4528 },
            { large: 9734, small: 7929 },
            { large: 1218, small: 223 }
        ],
        [
            { large: 5281, small: 2105 },
            { large: 7547, small: 3992 },
            { large: 5913, small: 4876 },
            { large: 8329, small: 1394 },
            { large: 7640, small: 7378 }
        ],
        [
            { large: 7382, small: 4190 },
            { large: 6712, small: 3487 },
            { large: 7710, small: 6693 },
            { large: 3237, small: 2956 },
            { large: 9400, small: 6457 }
        ],
        [
            { large: 5345, small: 3306 },
            { large: 6529, small: 4734 },
            { large: 5706, small: 4619 },
            { large: 1051, small: 394 },
            { large: 7225, small: 6282 }
        ],
        [
            { large: 4976, small: 2195 },
            { large: 8913, small: 3587 },
            { large: 7817, small: 6099 },
            { large: 9507, small: 1552 },
            { large: 7214, small: 6809 }
        ],
        [
            { large: 3223, small: 1106 },
            { large: 5640, small: 2721 },
            { large: 5503, small: 4495 },
            { large: 9301, small: 8310 },
            { large: 2009, small: 747 }
        ]
    ]
};

const predefinedSetsA8 = {
    easy: [
        [{ number: -3 }, { number: 2 }, { number: 7 }, { number: 5 }, { number: -2 }, { number: 3 }, { number: -4 }],
        [{ number: -2 }, { number: 3 }, { number: -5 }, { number: -7 }, { number: -1 }, { number: 2 }, { number: -6 }],
        [{ number: 1 }, { number: -4 }, { number: 3 }, { number: -2 }, { number: -7 }, { number: -3 }, { number: 2 }],
        [{ number: -1 }, { number: 4 }, { number: -3 }, { number: 3 }, { number: -2 }, { number: -7 }, { number: -5 }],
        [{ number: -6 }, { number: 1 }, { number: -4 }, { number: 3 }, { number: 7 }, { number: 2 }, { number: -2 }],
        [{ number: 2 }, { number: -1 }, { number: 4 }, { number: -5 }, { number: 3 }, { number: -4 }, { number: -7 }],
        [{ number: -2 }, { number: 5 }, { number: 7 }, { number: 4 }, { number: -1 }, { number: 2 }, { number: -6 }],
        [{ number: 3 }, { number: -4 }, { number: -7 }, { number: -1 }, { number: 4 }, { number: -3 }, { number: 1 }],
        [{ number: -1 }, { number: 3 }, { number: 7 }, { number: 2 }, { number: -2 }, { number: 4 }, { number: -3 }],
        [{ number: -5 }, { number: 2 }, { number: -1 }, { number: -7 }, { number: -4 }, { number: 1 }, { number: -6 }]
    ],
    hard: [
        [{ x: 3, y: 4 }, { x: -2, y: -3 }, { x: -1, y: 5 }, { x: 4, y: -2 }, { x: -5, y: 3 }, { x: -1, y: -4 }, { x: 3, y: -1 }],
        [{ x: 2, y: 4 }, { x: -3, y: -5 }, { x: 4, y: -2 }, { x: -1, y: 3 }, { x: 5, y: 4 }, { x: -2, y: 4 }, { x: 3, y: -5 }],
        [{ x: 4, y: 3 }, { x: -1, y: -5 }, { x: -2, y: 4 }, { x: 3, y: -1 }, { x: -3, y: 5 }, { x: -2, y: -4 }, { x: -1, y: 4 }],
        [{ x: 5, y: 2 }, { x: -3, y: -4 }, { x: 1, y: -4 }, { x: -5, y: 2 }, { x: 4, y: 1 }, { x: -2, y: -3 }, { x: 3, y: -5 }],
        [{ x: 1, y: 3 }, { x: -4, y: -2 }, { x: -3, y: 5 }, { x: 2, y: 4 }, { x: -5, y: 1 }, { x: 3, y: -2 }, { x: -2, y: 4 }],
        [{ x: 3, y: 4 }, { x: -1, y: -5 }, { x: -4, y: -2 }, { x: -2, y: 3 }, { x: 5, y: 1 }, { x: -4, y: -2 }, { x: 1, y: -5 }],
        [{ x: 3, y: 5 }, { x: -2, y: -4 }, { x: -1, y: 4 }, { x: 3, y: -5 }, { x: -2, y: 3 }, { x: 4, y: -1 }, { x: -4, y: 1 }],
        [{ x: 1, y: 4 }, { x: -5, y: -2 }, { x: 4, y: -3 }, { x: 2, y: 5 }, { x: 3, y: 1 }, { x: -4, y: -2 }, { x: 5, y: -3 }],
        [{ x: 1, y: 4 }, { x: -3, y: -5 }, { x: -2, y: 4 }, { x: 5, y: -3 }, { x: -4, y: 1 }, { x: -2, y: -3 }, { x: -3, y: 5 }],
        [{ x: 2, y: 5 }, { x: -1, y: -3 }, { x: 4, y: -2 }, { x: -3, y: 5 }, { x: 1, y: 4 }, { x: -5, y: -2 }, { x: 3, y: -1 }]
    ]
};

const predefinedSetsA9 = {
    easy: [
        [
            { leftValue: 2, rightValue: 5 },
            { leftValue: 15, rightValue: 22 },
            { leftValue: 17, rightValue: 29 },
            { leftValue: 21, rightValue: 22 },
            { leftValue: 11, rightValue: 26 },
            { leftValue: 8, rightValue: 29 },
            { leftValue: 13, rightValue: 28 }
        ],
        [
            { leftValue: 2, rightValue: 8 },
            { leftValue: 14, rightValue: 28 },
            { leftValue: 10, rightValue: 20 },
            { leftValue: 6, rightValue: 28 },
            { leftValue: 10, rightValue: 21 },
            { leftValue: 2, rightValue: 24 },
            { leftValue: 8, rightValue: 19 }
        ],
        [
            { leftValue: 4, rightValue: 5 },
            { leftValue: 13, rightValue: 25 },
            { leftValue: 4, rightValue: 28 },
            { leftValue: 5, rightValue: 17 },
            { leftValue: 21, rightValue: 26 },
            { leftValue: 10, rightValue: 20 },
            { leftValue: 1, rightValue: 21 }
        ],
        [
            { leftValue: 6, rightValue: 9 },
            { leftValue: 3, rightValue: 19 },
            { leftValue: 4, rightValue: 24 },
            { leftValue: 14, rightValue: 25 },
            { leftValue: 12, rightValue: 27 },
            { leftValue: 10, rightValue: 22 },
            { leftValue: 5, rightValue: 18 }
        ],
        [
            { leftValue: 1, rightValue: 3 },
            { leftValue: 11, rightValue: 25 },
            { leftValue: 8, rightValue: 28 },
            { leftValue: 3, rightValue: 26 },
            { leftValue: 13, rightValue: 28 },
            { leftValue: 10, rightValue: 17 },
            { leftValue: 2, rightValue: 24 }
        ],
        [
            { leftValue: 1, rightValue: 9 },
            { leftValue: 5, rightValue: 15 },
            { leftValue: 10, rightValue: 21 },
            { leftValue: 7, rightValue: 29 },
            { leftValue: 11, rightValue: 27 },
            { leftValue: 8, rightValue: 19 },
            { leftValue: 2, rightValue: 26 }
        ],
        [
            { leftValue: 1, rightValue: 2 },
            { leftValue: 6, rightValue: 17 },
            { leftValue: 13, rightValue: 23 },
            { leftValue: 4, rightValue: 19 },
            { leftValue: 11, rightValue: 23 },
            { leftValue: 13, rightValue: 24 },
            { leftValue: 4, rightValue: 19 }
        ],
        [
            { leftValue: 2, rightValue: 5 },
            { leftValue: 5, rightValue: 15 },
            { leftValue: 10, rightValue: 22 },
            { leftValue: 6, rightValue: 27 },
            { leftValue: 11, rightValue: 24 },
            { leftValue: 1, rightValue: 22 },
            { leftValue: 3, rightValue: 28 }
        ],
        [
            { leftValue: 4, rightValue: 6 },
            { leftValue: 9, rightValue: 29 },
            { leftValue: 12, rightValue: 26 },
            { leftValue: 2, rightValue: 22 },
            { leftValue: 5, rightValue: 17 },
            { leftValue: 11, rightValue: 25 },
            { leftValue: 7, rightValue: 19 }
        ],
        [
            { leftValue: 1, rightValue: 7 },
            { leftValue: 6, rightValue: 26 },
            { leftValue: 13, rightValue: 25 },
            { leftValue: 8, rightValue: 29 },
            { leftValue: 13, rightValue: 24 },
            { leftValue: 8, rightValue: 29 },
            { leftValue: 12, rightValue: 27 }
        ]
    ],
    hard: [
        [
            { leftValue: 15, rightValue: 34 },
            { leftValue: 12, rightValue: 20 },
            { leftValue: 21, rightValue: 36 },
            { leftValue: 11, rightValue: 30 },
            { leftValue: 4, rightValue: 33 },
            { leftValue: 17, rightValue: 35 },
            { leftValue: 10, rightValue: 32 }
        ],
        [
            { leftValue: 16, rightValue: 34 },
            { leftValue: 1, rightValue: 30 },
            { leftValue: 29, rightValue: 37 },
            { leftValue: 3, rightValue: 31 },
            { leftValue: 12, rightValue: 20 },
            { leftValue: 17, rightValue: 35 },
            { leftValue: 5, rightValue: 32 }
        ],
        [
            { leftValue: 8, rightValue: 36 },
            { leftValue: 28, rightValue: 31 },
            { leftValue: 7, rightValue: 20 },
            { leftValue: 12, rightValue: 30 },
            { leftValue: 19, rightValue: 35 },
            { leftValue: 14, rightValue: 32 },
            { leftValue: 6, rightValue: 34 }
        ],
        [
            { leftValue: 14, rightValue: 33 },
            { leftValue: 11, rightValue: 29 },
            { leftValue: 18, rightValue: 30 },
            { leftValue: 15, rightValue: 32 },
            { leftValue: 25, rightValue: 31 },
            { leftValue: 11, rightValue: 20 },
            { leftValue: 12, rightValue: 31 }
        ],
        [
            { leftValue: 12, rightValue: 37 },
            { leftValue: 16, rightValue: 30 },
            { leftValue: 24, rightValue: 31 },
            { leftValue: 17, rightValue: 25 },
            { leftValue: 13, rightValue: 30 },
            { leftValue: 8, rightValue: 36 },
            { leftValue: 16, rightValue: 23 }
        ],
        [
            { leftValue: 13, rightValue: 32 },
            { leftValue: 12, rightValue: 20 },
            { leftValue: 27, rightValue: 35 },
            { leftValue: 4, rightValue: 30 },
            { leftValue: 18, rightValue: 33 },
            { leftValue: 5, rightValue: 21 },
            { leftValue: 9, rightValue: 20 }
        ],
        [
            { leftValue: 16, rightValue: 31 },
            { leftValue: 13, rightValue: 30 },
            { leftValue: 19, rightValue: 26 },
            { leftValue: 3, rightValue: 20 },
            { leftValue: 15, rightValue: 33 },
            { leftValue: 17, rightValue: 37 },
            { leftValue: 29, rightValue: 32 }
        ],
        [
            { leftValue: 7, rightValue: 35 },
            { leftValue: 12, rightValue: 30 },
            { leftValue: 29, rightValue: 36 },
            { leftValue: 5, rightValue: 32 },
            { leftValue: 14, rightValue: 23 },
            { leftValue: 19, rightValue: 37 },
            { leftValue: 13, rightValue: 20 }
        ],
        [
            { leftValue: 14, rightValue: 33 },
            { leftValue: 11, rightValue: 28 },
            { leftValue: 16, rightValue: 30 },
            { leftValue: 19, rightValue: 22 },
            { leftValue: 7, rightValue: 36 },
            { leftValue: 23, rightValue: 30 },
            { leftValue: 5, rightValue: 32 }
        ],
        [
            { leftValue: 18, rightValue: 31 },
            { leftValue: 13, rightValue: 30 },
            { leftValue: 9, rightValue: 37 },
            { leftValue: 15, rightValue: 32 },
            { leftValue: 13, rightValue: 20 },
            { leftValue: 24, rightValue: 33 },
            { leftValue: 7, rightValue: 23 }
        ]
    ]
};

const predefinedSetsA10 = {
    easy: [
        [
            { numberLarge: 2453, numberSmall: 1232 },
            { numberLarge: 3411, numberSmall: 2476 },
            { numberLarge: 4678, numberSmall: 3699 },
            { numberLarge: 5231, numberSmall: 3383 },
            { numberLarge: 6781, numberSmall: 5898 }
        ],
        [
            { numberLarge: 2345, numberSmall: 1231 },
            { numberLarge: 5321, numberSmall: 2398 },
            { numberLarge: 7523, numberSmall: 3456 },
            { numberLarge: 5678, numberSmall: 4769 },
            { numberLarge: 9780, numberSmall: 7898 }
        ],
        [
            { numberLarge: 9832, numberSmall: 1720 },
            { numberLarge: 8855, numberSmall: 1889 },
            { numberLarge: 8376, numberSmall: 2457 },
            { numberLarge: 9380, numberSmall: 7801 },
            { numberLarge: 5231, numberSmall: 4576 }
        ],
        [
            { numberLarge: 7943, numberSmall: 6830 },
            { numberLarge: 2621, numberSmall: 1645 },
            { numberLarge: 3765, numberSmall: 3499 },
            { numberLarge: 1876, numberSmall: 1599 },
            { numberLarge: 8533, numberSmall: 6657 }
        ],
        [
            { numberLarge: 5649, numberSmall: 1431 },
            { numberLarge: 2797, numberSmall: 1989 },
            { numberLarge: 4864, numberSmall: 3963 },
            { numberLarge: 5125, numberSmall: 4764 },
            { numberLarge: 3769, numberSmall: 7876 }
        ],
        [
            { numberLarge: 7754, numberSmall: 4511 },
            { numberLarge: 2865, numberSmall: 2689 },
            { numberLarge: 3920, numberSmall: 3765 },
            { numberLarge: 2523, numberSmall: 1665 },
            { numberLarge: 7341, numberSmall: 1586 }
        ],
        [
            { numberLarge: 3564, numberSmall: 1152 },
            { numberLarge: 7574, numberSmall: 4868 },
            { numberLarge: 7810, numberSmall: 3474 },
            { numberLarge: 4245, numberSmall: 2586 },
            { numberLarge: 5023, numberSmall: 2696 }
        ],
        [
            { numberLarge: 6575, numberSmall: 4351 },
            { numberLarge: 9381, numberSmall: 6472 },
            { numberLarge: 8312, numberSmall: 3583 },
            { numberLarge: 9105, numberSmall: 4696 },
            { numberLarge: 6016, numberSmall: 5927 }
        ],
        [
            { numberLarge: 2681, numberSmall: 1470 },
            { numberLarge: 3492, numberSmall: 2285 },
            { numberLarge: 1803, numberSmall: 3992 },
            { numberLarge: 8814, numberSmall: 4933 },
            { numberLarge: 5025, numberSmall: 4937 }
        ],
        [
            { numberLarge: 8790, numberSmall: 2570 },
            { numberLarge: 4627, numberSmall: 2593 },
            { numberLarge: 6901, numberSmall: 5767 },
            { numberLarge: 4001, numberSmall: 3912 },
            { numberLarge: 8134, numberSmall: 5295 }
        ]
    ],
    hard: [
        [
            { numberLarge: 2245, numberSmall: 3256 },
            { numberLarge: 4367, numberSmall: 2458 },
            { numberLarge: 3478, numberSmall: 5459 },
            { numberLarge: 4173, numberSmall: 6234 },
            { numberLarge: 5789, numberSmall: 9678 }
        ],
        [
            { numberLarge: 5012, numberSmall: 7234 },
            { numberLarge: 7456, numberSmall: 2557 },
            { numberLarge: 7567, numberSmall: 9457 },
            { numberLarge: 4967, numberSmall: 6678 },
            { numberLarge: 1278, numberSmall: 5698 }
        ],
        [
            { numberLarge: 2454, numberSmall: 8867 },
            { numberLarge: 8365, numberSmall: 1975 },
            { numberLarge: 4216, numberSmall: 2396 },
            { numberLarge: 3795, numberSmall: 5587 },
            { numberLarge: 4698, numberSmall: 6576 }
        ],
        [
            { numberLarge: 2543, numberSmall: 1223 },
            { numberLarge: 3613, numberSmall: 2845 },
            { numberLarge: 2765, numberSmall: 9466 },
            { numberLarge: 5871, numberSmall: 9180 },
            { numberLarge: 9487, numberSmall: 6678 }
        ],
        [
            { numberLarge: 6642, numberSmall: 9782 },
            { numberLarge: 6751, numberSmall: 2802 },
            { numberLarge: 8864, numberSmall: 3898 },
            { numberLarge: 1975, numberSmall: 4768 },
            { numberLarge: 6086, numberSmall: 3875 }
        ],
        [
            { numberLarge: 2444, numberSmall: 4549 },
            { numberLarge: 8225, numberSmall: 7654 },
            { numberLarge: 2976, numberSmall: 6795 },
            { numberLarge: 5387, numberSmall: 7310 },
            { numberLarge: 1698, numberSmall: 2586 }
        ],
        [
            { numberLarge: 2411, numberSmall: 8952 },
            { numberLarge: 3574, numberSmall: 1874 },
            { numberLarge: 2685, numberSmall: 8476 },
            { numberLarge: 1796, numberSmall: 6587 },
            { numberLarge: 3267, numberSmall: 5656 }
        ],
        [
            { numberLarge: 1122, numberSmall: 2368 },
            { numberLarge: 9643, numberSmall: 2778 },
            { numberLarge: 8794, numberSmall: 3986 },
            { numberLarge: 1905, numberSmall: 4694 },
            { numberLarge: 2016, numberSmall: 5905 }
        ],
        [
            { numberLarge: 3683, numberSmall: 4699 },
            { numberLarge: 5591, numberSmall: 2782 },
            { numberLarge: 1803, numberSmall: 7692 },
            { numberLarge: 5914, numberSmall: 9713 },
            { numberLarge: 6025, numberSmall: 7914 }
        ],
        [
            { numberLarge: 2050, numberSmall: 7579 },
            { numberLarge: 6800, numberSmall: 1591 },
            { numberLarge: 4912, numberSmall: 3763 },
            { numberLarge: 5023, numberSmall: 6912 },
            { numberLarge: 8134, numberSmall: 9023 }
        ]
    ]
};

export { predefinedSetsA1, predefinedSetsA2, predefinedSetsA3, predefinedSetsA5, predefinedSetsA6, predefinedSetsA7, predefinedSetsA8, predefinedSetsA9, predefinedSetsA10 };