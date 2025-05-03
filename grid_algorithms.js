// minimal starter – attach more later.
export function bfs(grid, start, goal, visit) {
  const q = [start], seen = new Set([start.toString()]);
  while (q.length) {
    const [x, y] = q.shift();
    visit(x, y);                       // drive renderer callback
    if (x === goal[0] && y === goal[1]) return true;
    for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nx = x + dx, ny = y + dy, key = `${nx},${ny}`;
      // Check bounds and if the cell is walkable (assuming 1 is walkable)
      // Ensure grid[nx] exists before accessing grid[nx][ny]
      if (grid[nx] !== undefined && grid[nx][ny] !== undefined && grid[nx][ny] === 1 && !seen.has(key)) {
          seen.add(key);
          q.push([nx,ny]);
      }
    }
  }
  return false;
}

// dfs is identical except uses recursion / stack.
// Placeholder - implement DFS logic here
export function dfs(grid, start, goal, visit) {
    console.warn("DFS not implemented yet.");
    // Basic recursive structure example (needs refinement for pathfinding)
    const stack = [start];
    const seen = new Set([start.toString()]);
    const path = {}; // To reconstruct path if needed

    function _dfs(x, y) {
        visit(x, y);
        if (x === goal[0] && y === goal[1]) return true;

        for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
            const nx = x + dx, ny = y + dy, key = `${nx},${ny}`;
            if (grid[nx] !== undefined && grid[nx][ny] !== undefined && grid[nx][ny] === 1 && !seen.has(key)) {
                seen.add(key);
                path[key] = [x, y]; // Store predecessor
                if (_dfs(nx, ny)) return true;
            }
        }
        return false;
    }

    return _dfs(start[0], start[1]);
}
