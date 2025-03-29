# Data Experiments

A collection of interactive 3D data visualizations and experiments for pattern analysis and machine learning research.

![3D Sorting Visualization](screenshots/sorting-demo.png)

## Overview

This repository contains interactive web-based visualizations that render data and algorithms in innovative ways, primarily using 3D space to reveal patterns that might not be apparent in traditional 2D representations. These visualizations are designed to explore how visual pattern analysis could potentially inform machine learning approaches to algorithm optimization and data understanding.

## Current Visualizations

### 3D Sorting Algorithm Visualizer

The first visualization in this collection renders sorting algorithms in 3D space, with time as the third dimension. This approach reveals patterns in how different sorting algorithms operate.

**Features:**
- **3D Time Progression**: Watch sorting algorithms evolve along the Z-axis
- **Multiple Algorithms**: Bubble Sort, Insertion Sort, Selection Sort, Quick Sort, and Merge Sort
- **Correctness Coloring**: Elements are colored based on their proximity to correct positions
- **Comparison Tracking**: Visualizes which elements are compared during sorting
- **Movement Tracking**: Shows how elements move toward their final positions
- **Interactive Controls**: Adjust visualization parameters in real-time
- **Smart Camera**: Camera follows the sorting progression for optimal viewing

## Machine Learning Potential

These visualizations are created to explore the potential for machine learning to identify patterns and optimize algorithms:

- Visual patterns in algorithm execution could be learned by ML models
- Element movements and comparison patterns might be predictive of algorithm efficiency
- ML could potentially classify algorithms based on their visual execution traces
- The visualizations could help identify opportunities for algorithm optimization

## Getting Started

### Prerequisites

- A modern web browser with WebGL support

### Running Locally

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/data_experiments.git
   ```

2. Open any of the HTML files in your web browser.

No build process or dependencies required! The visualizations use Three.js loaded via CDN.

## Using the Sorting Visualizer

1. Open `sorting-visualizer.html` in your browser
2. Select a sorting algorithm from the dropdown
3. Choose the number of elements and data pattern
4. Click "Start Sorting" to begin the visualization
5. Use your mouse to rotate, zoom, and pan the 3D view
6. Adjust animation speed with the slider
7. Toggle comparison and movement visualizations with the checkboxes

## Contributing

Contributions are welcome! Feel free to submit pull requests for new visualizations, enhancements to existing ones, or machine learning integrations.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-viz`)
3. Commit your changes (`git commit -m 'Add some amazing visualization'`)
4. Push to the branch (`git push origin feature/amazing-viz`)
5. Open a Pull Request

## Future Visualization Plans

- Graph algorithm visualizations
- Neural network training progression in 3D
- Data clustering visualizations
- Decision tree growth patterns
- Optimization algorithm search space exploration

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Three.js for 3D rendering capabilities
- Inspired by discussions about ML applications in visual pattern analysis
