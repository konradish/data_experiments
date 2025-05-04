function greedyBestFirstSearch(grid, startNode, endNode) {
    const visitedNodesInOrder = [];
    const openSet = [startNode];
    
    startNode.h = heuristic(startNode, endNode);
    
    while (openSet.length > 0) {
        sortNodesByHeuristic(openSet);
        const currentNode = openSet.shift();
        
        if (currentNode.isWall) continue;
        
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);
        
        if (currentNode === endNode) return visitedNodesInOrder;
        
        const neighbors = getUnvisitedNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited && !openSet.includes(neighbor)) {
                neighbor.previousNode = currentNode;
                neighbor.h = heuristic(neighbor, endNode);
                openSet.push(neighbor);
            }
        }
    }
    return visitedNodesInOrder; // No path found
}

function heuristic(nodeA, nodeB) {
    // Manhattan distance
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

function sortNodesByHeuristic(nodes) {
    nodes.sort((nodeA, nodeB) => nodeA.h - nodeB.h);
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

// Export for Node.js/CommonJS environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { greedyBestFirstSearch };
}
