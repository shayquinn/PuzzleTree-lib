# PuzzleTree-lib

A lightweight JavaScript library that transforms images into interactive, draggable jigsaw puzzles directly in your web browser. No dependencies required!

![Demo](gif.gif)

## Features

- 🧩 **Customizable Grid**: Define any number of rows and columns for your puzzle
- 🎲 **Shuffle Control**: Optional shuffling of puzzle pieces
- 📱 **Touch & Mouse Support**: Works seamlessly on desktop and mobile devices
- 🖼️ **Multiple Puzzles**: Support for multiple independent puzzles on the same page
- ⚡ **Accurate Division**: Handles images of any dimension with precise tile calculations
- 🎯 **Auto-completion Detection**: Displays a congratulations message when puzzle is solved

## Installation

Simply download `PuzzleTree.js` and include it in your HTML file:

```html
<script src="PuzzleTree.js"></script>
```

## Usage

### Basic Example

Add the `puzzleTree` class and `row`/`col` attributes to any image element:

```html
<img src="images/my-image.jpg" class="puzzleTree" row="6" col="4" alt="Puzzle">
<script src="PuzzleTree.js"></script>
```

### Control Shuffling

By default, puzzle pieces are shuffled. You can disable shuffling by setting the `shuffle` attribute to `"false"`:

```html
<!-- Shuffled puzzle (default) -->
<img src="images/puzzle1.jpg" class="puzzleTree" row="5" col="5" alt="Puzzle">

<!-- Non-shuffled puzzle -->
<img src="images/puzzle2.jpg" class="puzzleTree" row="5" col="5" shuffle="false" alt="Puzzle">
```

### Multiple Puzzles

You can have multiple puzzles on the same page:

```html
<img id="puzzle1" src="images/image1.jpg" class="puzzleTree" row="4" col="4" alt="Easy Puzzle">
<img id="puzzle2" src="images/image2.jpg" class="puzzleTree" row="8" col="6" alt="Hard Puzzle">
<script src="PuzzleTree.js"></script>
```

### Adjusting Image Size

Control the puzzle size using standard HTML attributes or CSS:

```html
<!-- Using width attribute -->
<img src="images/puzzle.jpg" class="puzzleTree" row="6" col="6" width="600" alt="Puzzle">

<!-- Using CSS -->
<style>
  #myPuzzle {
    width: 800px;
    height: 600px;
  }
</style>
<img id="myPuzzle" src="images/puzzle.jpg" class="puzzleTree" row="6" col="6" alt="Puzzle">
```

## Attributes

| Attribute | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `class` | string | Yes | - | Must include `"puzzleTree"` |
| `row` | number | Yes | - | Number of horizontal divisions (puzzle columns) |
| `col` | number | Yes | - | Number of vertical divisions (puzzle rows) |
| `shuffle` | string | No | `"true"` | Set to `"false"` to disable shuffling |
| `src` | string | Yes | - | Path to the image file |

## How It Works

1. The library automatically detects all images with the `puzzleTree` class
2. Once the image loads, it calculates tile dimensions based on `row` and `col` attributes
3. The original image is hidden and replaced with draggable puzzle pieces
4. Users can drag and drop pieces to solve the puzzle
5. When completed correctly, a "Puzzle Complete! :)" message appears

## Browser Support

PuzzleTree-lib works in all modern browsers that support:
- ES6 JavaScript
- CSS3 Transforms
- Touch Events (for mobile)

Tested on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Examples

Check out these example files in the repository:
- `index.html` - Basic single puzzle example
- `test.html` - Side-by-side comparison of shuffled vs non-shuffled
- `test-complete.html` - Comprehensive test suite with multiple configurations

## License

MIT License - see [LICENSE](LICENSE) file for details

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## Author

Created by [Shay Quinn](https://github.com/shayquinn)