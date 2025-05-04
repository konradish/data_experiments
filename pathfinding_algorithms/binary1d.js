function binarySearch1D(grid, startNode, endNode) {
    const visitedNodesInOrder = [];
    
    // Convert grid to 1D sorted array
    const sortedArray = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            sortedArray.push({
                node: grid[row][col],
                value: row * grid[0].length + col // Simple value based on position
            });
        }
    }
    sortedArray.sort((a, b) => a.value - b.value);

    const targetValue = Math.floor(sortedArray.length / 2); // Middle value as target
    let left = 0;
    let right = sortedArray.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midNode = sortedArray[mid].node;
        
        // Mark as visited
        midNode.isVisited = true;
        visitedNodesInOrder.push(midNode);

        if (midNode === endNode) {
            return visitedNodesInOrder; // Found target
        }

        if (midNode.value < targetValue) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return visitedNodesInOrder;
}

// Export for Node.js/CommonJS environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { binarySearch1D };
}
