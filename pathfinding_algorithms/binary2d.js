function binarySearch2D(grid, startNode, endNode) {
    const visitedNodesInOrder = [];
    const rows = grid.length;
    const cols = grid[0].length;

    // Treat grid as sorted row-wise
    let top = 0;
    let bottom = rows - 1;
    const targetCol = Math.floor(cols / 2);

    while (top <= bottom) {
        const midRow = Math.floor((top + bottom) / 2);
        const midNode = grid[midRow][targetCol];
        
        // Mark as visited
        midNode.isVisited = true;
        visitedNodesInOrder.push(midNode);

        if (midNode === endNode) {
            return visitedNodesInOrder; // Found target
        }

        // Simple comparison - could be customized
        if (midRow * cols + targetCol < (rows * cols) / 2) {
            top = midRow + 1;
        } else {
            bottom = midRow - 1;
        }
    }

    return visitedNodesInOrder;
}

// Export for Node.js/CommonJS environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { binarySearch2D };
}
