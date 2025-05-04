const SortingAlgorithms = {
    bubbleSort: function(visualizer, array) {
        const len = array.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                // Record comparison
                visualizer.comparisons.push([j, j + 1]);
                
                if (array[j] > array[j + 1]) {
                    // Record movement before swap
                    visualizer.movements.push([j + 1, j]);
                    
                    // Swap elements
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    
                    // Record array state after swap
                    visualizer.arrays.push([...array]);
                    
                    // Push null for comparisons/movements to keep arrays aligned
                    visualizer.comparisons.push(null);
                    visualizer.movements.push(null);
                } else {
                    // Still record the array state even if no swap
                    visualizer.arrays.push([...array]);
                    visualizer.comparisons.push(null);
                    visualizer.movements.push(null);
                }
            }
        }
    },

    insertionSort: function(visualizer, array) {
        const len = array.length;
        for (let i = 1; i < len; i++) {
            let j = i;
            while (j > 0 && array[j - 1] > array[j]) {
                // Record comparison
                visualizer.comparisons.push([j - 1, j]);
                
                // Record movement before swap
                visualizer.movements.push([j, j - 1]);
                
                // Swap elements
                [array[j], array[j - 1]] = [array[j - 1], array[j]];
                
                // Record array state after swap
                visualizer.arrays.push([...array]);
                visualizer.comparisons.push(null);
                visualizer.movements.push(null);
                
                j--;
            }
            if (j > 0) {
                // Record final comparison that stopped the loop
                visualizer.comparisons.push([j - 1, j]);
                visualizer.arrays.push([...array]);
                visualizer.comparisons.push(null);
                visualizer.movements.push(null);
            }
        }
    },

    selectionSort: function(visualizer, array) {
        const len = array.length;
        for (let i = 0; i < len - 1; i++) {
            let minIndex = i;
            
            // Find minimum in unsorted portion
            for (let j = i + 1; j < len; j++) {
                // Record comparison
                visualizer.comparisons.push([minIndex, j]);
                visualizer.arrays.push([...array]);
                visualizer.comparisons.push(null);
                visualizer.movements.push(null);
                
                if (array[j] < array[minIndex]) {
                    minIndex = j;
                }
            }
            
            if (minIndex !== i) {
                // Record movement before swap
                visualizer.movements.push([i, minIndex]);
                
                // Swap elements
                [array[i], array[minIndex]] = [array[minIndex], array[i]];
                
                // Record array state after swap
                visualizer.arrays.push([...array]);
                visualizer.comparisons.push(null);
                visualizer.movements.push(null);
            }
        }
    },

    quickSort: function(visualizer, array, left = 0, right = array.length - 1) {
        if (left < right) {
            const pivotIndex = this.partition(visualizer, array, left, right);
            this.quickSort(visualizer, array, left, pivotIndex - 1);
            this.quickSort(visualizer, array, pivotIndex + 1, right);
        }
    },

    partition: function(visualizer, array, left, right) {
        const pivot = array[right];
        let i = left;
        
        for (let j = left; j < right; j++) {
            // Record comparison
            visualizer.comparisons.push([j, right]);
            visualizer.arrays.push([...array]);
            visualizer.comparisons.push(null);
            visualizer.movements.push(null);
            
            if (array[j] < pivot) {
                if (i !== j) {
                    // Record movement before swap
                    visualizer.movements.push([i, j]);
                    
                    // Swap elements
                    [array[i], array[j]] = [array[j], array[i]];
                    
                    // Record array state after swap
                    visualizer.arrays.push([...array]);
                    visualizer.comparisons.push(null);
                    visualizer.movements.push(null);
                }
                i++;
            }
        }
        
        // Final swap with pivot
        if (i !== right) {
            // Record movement before swap
            visualizer.movements.push([i, right]);
            
            // Swap elements
            [array[i], array[right]] = [array[right], array[i]];
            
            // Record array state after swap
            visualizer.arrays.push([...array]);
            visualizer.comparisons.push(null);
            visualizer.movements.push(null);
        }
        
        return i;
    },

    mergeSort: function(visualizer, array, left = 0, right = array.length - 1) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            this.mergeSort(visualizer, array, left, mid);
            this.mergeSort(visualizer, array, mid + 1, right);
            this.merge(visualizer, array, left, mid, right);
        }
    },

    merge: function(visualizer, array, left, mid, right) {
        const leftArray = array.slice(left, mid + 1);
        const rightArray = array.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArray.length && j < rightArray.length) {
            // Record comparison
            visualizer.comparisons.push([left + i, mid + 1 + j]);
            visualizer.arrays.push([...array]);
            visualizer.comparisons.push(null);
            visualizer.movements.push(null);
            
            if (leftArray[i] <= rightArray[j]) {
                if (k !== left + i) {
                    // Record movement
                    visualizer.movements.push([k, left + i]);
                    
                    array[k] = leftArray[i];
                    
                    // Record array state after move
                    visualizer.arrays.push([...array]);
                    visualizer.comparisons.push(null);
                    visualizer.movements.push(null);
                }
                i++;
            } else {
                if (k !== mid + 1 + j) {
                    // Record movement
                    visualizer.movements.push([k, mid + 1 + j]);
                    
                    array[k] = rightArray[j];
                    
                    // Record array state after move
                    visualizer.arrays.push([...array]);
                    visualizer.comparisons.push(null);
                    visualizer.movements.push(null);
                }
                j++;
            }
            k++;
        }
        
        // Copy remaining elements
        while (i < leftArray.length) {
            if (k !== left + i) {
                // Record movement
                visualizer.movements.push([k, left + i]);
                
                array[k] = leftArray[i];
                
                // Record array state after move
                visualizer.arrays.push([...array]);
                visualizer.comparisons.push(null);
                visualizer.movements.push(null);
            }
            i++;
            k++;
        }
        
        while (j < rightArray.length) {
            if (k !== mid + 1 + j) {
                // Record movement
                visualizer.movements.push([k, mid + 1 + j]);
                
                array[k] = rightArray[j];
                
                // Record array state after move
                visualizer.arrays.push([...array]);
                visualizer.comparisons.push(null);
                visualizer.movements.push(null);
            }
            j++;
            k++;
        }
    },

    radixSort: function(visualizer, array) {
        const maxNum = Math.max(...array);
        const maxDigits = Math.floor(Math.log10(maxNum)) + 1;
        
        for (let digit = 0; digit < maxDigits; digit++) {
            const buckets = Array.from({ length: 10 }, () => []);
            
            // Distribute numbers into buckets
            for (let i = 0; i < array.length; i++) {
                const digitValue = Math.floor(array[i] / Math.pow(10, digit)) % 10;
                buckets[digitValue].push(array[i]);
            }
            
            // Reconstruct array from buckets
            let index = 0;
            for (let bucketIndex = 0; bucketIndex < buckets.length; bucketIndex++) {
                for (let num of buckets[bucketIndex]) {
                    // Record movement
                    visualizer.movements.push([index, -1]); // -1 indicates coming from bucket
                    
                    array[index] = num;
                    
                    // Record array state after move
                    visualizer.arrays.push([...array]);
                    visualizer.comparisons.push(null);
                    visualizer.movements.push(null);
                    
                    index++;
                }
            }
        }
    }
};

// Export for Node.js/CommonJS environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SortingAlgorithms;
}
