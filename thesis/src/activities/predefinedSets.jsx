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

//TODO:
const predefinedSetsA6 = {
    easy: [
        [
            { left: 2, right: 1 }, { left: 28, right: 25 }, { left: 9, right: 3 },
            { left: 17, right: 14 }, { left: 23, right: 12 }, { left: 4, right: 3 },
            { left: 16, right: 2 }
        ],
        [
            { left: 9, right: 1 }, { left: 19, right: 10 }, { left: 23, right: 12 },
            { left: 19, right: 16 }, { left: 18, right: 11 }, { left: 24, right: 11 },
            { left: 27, right: 21 }
        ],
        [
            { left: 4, right: 6 }, { left: 10, right: 16 }, { left: 19, right: 20 },
            { left: 12, right: 14 }, { left: 25, right: 23 }, { left: 29, right: 29 },
            { left: 21, right: 10 }
        ],
        [
            { left: 9, right: 7 }, { left: 16, right: 10 }, { left: 13, right: 11 },
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

export { predefinedSetsA1, predefinedSetsA2, predefinedSetsA3, predefinedSetsA5, predefinedSetsA6 };