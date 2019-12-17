#ifndef GAME_H
#define GAME_H

#include "gba.h"
#define MAX_SNAKE_LENGTH 100

                    /* TODO: */

            // Create any necessary structs //

typedef struct Node { // basically using a queue to handle the snake
    int x;
    int y;
    u16 color;
    u16 restore[9][9]; //2D array of the background behind the node
} Node; // this is a pixel of the snake

typedef enum {
    NORTH,
    SOUTH,
    EAST,
    WEST,
} Direction;

typedef struct Snake {
    
    Direction headDir;

    Node pieces[MAX_SNAKE_LENGTH];

    int head;
    int tail;

    int blockSize;
    int length;

    int speed;
} Snake;

#endif
