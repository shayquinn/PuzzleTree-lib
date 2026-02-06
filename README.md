# PuzzleTree-lib

Make puzzles from images on web pages

## Usage

In order to use this library on an image on an html document, after adding the script, add the class "puzzleTree" and the attributes of "row" and "col" like in the example:

```html
<img id="img1" src="images/im1.jpg" class="puzzleTree" row="12" col="6" alt="Puzzle">
<script src="PuzzleTree.js"></script>
```

### Optional Shuffle Control

By default, puzzle pieces are shuffled. You can disable shuffling by setting the `shuffle` attribute to `"false"`:

```html
<!-- Shuffled puzzle (default behavior) -->
<img id="img1" src="images/im1.jpg" class="puzzleTree" row="12" col="6" alt="Puzzle">

<!-- Non-shuffled puzzle -->
<img id="img2" src="images/im2.jpg" class="puzzleTree" row="12" col="6" shuffle="false" alt="Puzzle">
```

## Features

- Accurate image division: The library now correctly handles images whose dimensions don't divide evenly by the row/column count
- Shuffle control: Control whether puzzle pieces are shuffled on initialization
- Multiple puzzles: Support for multiple puzzles on the same page
- Touch and mouse support: Works on both desktop and mobile devices
