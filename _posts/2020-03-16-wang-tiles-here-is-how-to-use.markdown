---
layout: post
title:  "Wang Tiles: Here is How to Use"
description: How I used Wang Tiles to compose Pixel Maze puzzle.
permalink: /wang-tiles-here-is-how-to-use
---

The first <a href="/projects#pixel-maze">Pixel Maze</a> prototypes were basically a grid of lines representing walls of a carved maze. When the experimentation phase was over, it was time to apply an art layer on top of the black and white maze to start looking like a real game. After some research, I discovered that <a href="http://www.cr31.co.uk/stagecast/wang/intro.html" target="_blank">Wang Tiles</a> would be the preferred technique to make it happen.

<!--excerpt_separator-->

| ![A carved maze prototype](/assets/images/posts/2020-03-16-wang-tiles-here-is-how-to-use/carved-maze-prototype.png) | 
|:--:| 
| *A carved maze prototype* |

## Wang Tiles

Wang tiles are a great model of maze composition. A set of square tiles, with each tile edge representing a wall, are arranged side by side in a rectangular grid. Every tile has two different types of edge: wall and without a wall. After carving a maze, the Wang Tiles model is used to apply the correct art sprite to a specific cell in the maze.

**Carved maze + Wang Tiles = Pixel Maze**

Below is an array representing a set of Wang tiles of all 16 possible combinations. The blue color means the wall, and the yellow one means the absence of a wall.

| ![Wang Tiles array](/assets/images/posts/2020-03-16-wang-tiles-here-is-how-to-use/wang-tiles-array.png) | 
|:--:| 
| *Wang Tiles array* - <a href="http://www.cr31.co.uk/stagecast/wang/intro.html" target="_blank">*Image source*</a>|

To get a tile, an unique *index* in the array is calculated using bitwise operation. If there is a wall, add up using the following binary weighting:

- Wall North = 1
- Wall East = 2
- Wall South = 4
- Wall West = 8

For example, if a maze cell only contains a West and East walls, the array index will be 0 + 2 + 0 + 8 = 10.

| ![Wang Tile sprite](/assets/images/posts/2020-03-16-wang-tiles-here-is-how-to-use/wang-tiles-cell.png) | 
|:--:| 
| *Wang Tiles sprite* - <a href="http://www.cr31.co.uk/stagecast/wang/intro.html" target="_blank">*Image source*</a>|

Using Wang tiles to compose a maze theme was great because I only had to draw 16 tiles per world. Also, applying the tiles to the carved maze is very performant due to the easy array index access for getting tiles - *time complexity O(1)*.

| ![Forest Wang Tiles](/assets/images/posts/2020-03-16-wang-tiles-here-is-how-to-use/forest-wang-tiles.png) | 
|:--:| 
| *Forest Wang Tiles* |

With the image above I created an array of tiles and used it to produce large Forest maze levels.

| ![Pixel Maze Forest level](/assets/images/posts/2020-03-16-wang-tiles-here-is-how-to-use/pixel-maze-forest.png) | 
|:--:| 
| *Pixel Maze Forest level* |


