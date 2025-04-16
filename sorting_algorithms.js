// Sorting Algorithms for 3D Visualizer
// Each function takes the 'app' object as an argument
// to access and modify its state (arrays, comparisons, movements).

const SortingAlgorithms = {

    bubbleSort(app, array) {
        if (!array || !array.length) return;

        const n = array.length;
        let swapped;
        let stepCounter = Math.max(0, app.arrays.length - 1); // Start from the last recorded state index

        do {
            swapped = false;
            for (let i = 0; i < n - 1; i++) {
                // Record comparison for the *next* potential state
                app.comparisons[stepCounter] = [i, i + 1];
                app.movements[stepCounter] = null; // Assume no movement initially for this step

                if (array[i] > array[i + 1]) {
                    // Record movement for this step
                    app.movements[stepCounter] = [i, i + 1];

                    // Swap elements
                    [array[i], array[i + 1]] = [array[i + 1], array[i]];
                    swapped = true;

                    // Record array state *after* swap
                    app.arrays.push([...array]);
                    stepCounter++; // Increment step counter only after recording a new array state
                } else {
                     // If no swap, still record the state to visualize the comparison step
                     // Ensure comparison/movement arrays are extended if needed
                     app.comparisons[stepCounter] = [i, i + 1];
                     app.movements[stepCounter] = null;
                     app.arrays.push([...array]);
                     stepCounter++;
                }
            }
            // Optimization: reduce loop range if needed (can complicate index tracking)
            // n--;
        } while (swapped);
        // Ensure comparisons/movements arrays are padded to match arrays length if needed
         while (app.comparisons.length < app.arrays.length) app.comparisons.push(null);
         while (app.movements.length < app.arrays.length) app.movements.push(null);
    },

    insertionSort(app, array) {
        const n = array.length;

        let stepCounter = app.arrays.length - 1; // Start from the last recorded state index

        for (let i = 1; i < n; i++) {
            let key = array[i];
            let j = i - 1;
            let current_comparison_idx = i; // Index being compared/inserted

            // State before starting insertion for 'key' already exists (arrays[stepCounter])
            // Record initial comparison target (key vs element at j)
            app.comparisons[stepCounter] = (j >= 0) ? [j, current_comparison_idx] : null;
            app.movements[stepCounter] = null;

            while (j >= 0 && array[j] > key) {
                 // Record comparison for the *next* state
                 app.comparisons[stepCounter] = [j, current_comparison_idx];
                 // Record movement (shift) for the *next* state
                 app.movements[stepCounter] = [j + 1, j]; // Element at j moves to j+1

                 array[j + 1] = array[j];
                 current_comparison_idx = j + 1; // Update index of the 'hole'
                 j--;

                 // Record array state after shift
                 app.arrays.push([...array]);
                 stepCounter++;

                 // Record comparison for the *next* potential state (if loop continues)
                 app.comparisons[stepCounter] = (j >= 0) ? [j, current_comparison_idx] : null;
                 app.movements[stepCounter] = null; // Reset movement for next comparison
            }

            // Place the key in its correct position
            if (array[j + 1] !== key) {
                 // Record movement (final placement of key) for the *next* state
                 // We need a state to show the final placement
                 app.comparisons[stepCounter] = null;
                 // Movement is placing 'key' into j+1. Source is conceptual (original index i).
                 app.movements[stepCounter] = [j + 1, i];

                 array[j + 1] = key;

                 // Record final array state after insertion
                 app.arrays.push([...array]);
                 stepCounter++;
            } else {
                 // Key was already in place or loop didn't run, but we might need a state
                 // if the last comparison state wasn't recorded explicitly.
                 // Ensure the state after the inner loop is recorded if different.
                 if (!_.isEqual(app.arrays[stepCounter], array)) {
                     app.comparisons[stepCounter] = null; // No comparison/movement for this state
                     app.movements[stepCounter] = null;
                     app.arrays.push([...array]);
                     stepCounter++;
                 }
            }
        }
         // Ensure comparisons/movements arrays are padded
         while (app.comparisons.length < app.arrays.length) app.comparisons.push(null);
         while (app.movements.length < app.arrays.length) app.movements.push(null);
    },

    selectionSort(app, array) {
        const n = array.length;

        let stepCounter = app.arrays.length - 1; // Start from the last recorded state index

        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;

            // State before starting scan for pass 'i' already exists (arrays[stepCounter])
            // Record initial comparison for the *next* state
            app.comparisons[stepCounter] = (i + 1 < n) ? [minIdx, i + 1] : null;
            app.movements[stepCounter] = null;

            for (let j = i + 1; j < n; j++) {
                // Record comparison for the *next* state
                app.comparisons[stepCounter] = [minIdx, j];
                app.movements[stepCounter] = null; // No movement during comparison scan

                // Record array state for each comparison step
                app.arrays.push([...array]);
                stepCounter++;

                if (array[j] < array[minIdx]) {
                    minIdx = j;
                    // Update comparison target for the *next* step if minIdx changed
                    app.comparisons[stepCounter] = (j + 1 < n) ? [minIdx, j + 1] : null;
                } else {
                     // Set comparison for the *next* step
                     app.comparisons[stepCounter] = (j + 1 < n) ? [minIdx, j + 1] : null;
                }
                 app.movements[stepCounter] = null; // Ensure movement is null for next comparison state
            }

            // After finding the minimum, record the swap if needed
            if (minIdx !== i) {
                // Record movement (swap) for the *next* state
                app.comparisons[stepCounter] = null; // No comparison during swap
                app.movements[stepCounter] = [i, minIdx];

                // Swap elements
                [array[i], array[minIdx]] = [array[minIdx], array[i]];

                // Record array state *after* swap
                app.arrays.push([...array]);
                stepCounter++;
            } else {
                // If no swap needed, ensure the state marking the end of the pass is present
                // if it's different from the last comparison state.
                 if (!_.isEqual(app.arrays[stepCounter], array)) {
                     app.comparisons[stepCounter] = null;
                     app.movements[stepCounter] = null;
                     app.arrays.push([...array]);
                     stepCounter++;
                 }
            }
             // Ensure comparison/movement for the state *after* the potential swap/end-of-pass is nullified
             app.comparisons[stepCounter] = null;
             app.movements[stepCounter] = null;
        }
         // Ensure comparisons/movements arrays are padded
         while (app.comparisons.length < app.arrays.length) app.comparisons.push(null);
         while (app.movements.length < app.arrays.length) app.movements.push(null);
    },

    quickSort(app, array, low, high) {
        if (low < high) {
            const pivotIndex = this.partition(app, array, low, high);

            this.quickSort(app, array, low, pivotIndex - 1);
            this.quickSort(app, array, pivotIndex + 1, high);
        }
    },

    partition(app, array, low, high) {
        const pivot = array[high];
        let i = low - 1;
        let stepCounter = app.arrays.length - 1; // Start from the last recorded state index

        // State before partition loop exists (arrays[stepCounter])
        // Record initial comparison for the *next* state
        app.comparisons[stepCounter] = (low < high) ? [low, high] : null;
        app.movements[stepCounter] = null;

        for (let j = low; j < high; j++) {
            // Record comparison with pivot for the *next* state
            app.comparisons[stepCounter] = [j, high];
            app.movements[stepCounter] = null; // No movement yet for comparison step

            // Record state showing the comparison
            app.arrays.push([...array]);
            stepCounter++;

            if (array[j] < pivot) {
                i++;

                // Check if swap is necessary (i !== j)
                if (i !== j) {
                    // Record movement (swap) for the *next* state
                    app.comparisons[stepCounter] = null; // No comparison during swap
                    // Store both original and new positions for movement visualization
                    // Note: The movement format was changed in a previous step, let's keep it simple [to, from]
                    app.movements[stepCounter] = [i, j]; // Target index i, Source index j

                    // Swap elements
                    [array[i], array[j]] = [array[j], array[i]];

                    // Record array state *after* swap
                    app.arrays.push([...array]);
                    stepCounter++;
                }
                // If i === j, no actual swap occurs, no new state needed just for that.
            }
             // Record comparison for the *next* iteration (if j+1 < high)
             app.comparisons[stepCounter] = (j + 1 < high) ? [j + 1, high] : null;
             app.movements[stepCounter] = null; // Reset movement for next comparison
        }

        // Move pivot to its final position (swap with element at i + 1)
        // Check if swap is necessary (i + 1 !== high)
        if (i + 1 !== high) {
             // Record movement (pivot swap) for the *next* state
            app.comparisons[stepCounter] = null;
            app.movements[stepCounter] = [i + 1, high];

            // Swap elements
            [array[i + 1], array[high]] = [array[high], array[i + 1]];

            // Record array state *after* pivot swap
            app.arrays.push([...array]);
            stepCounter++;
        } else {
             // If pivot is already in place, ensure state exists if different
             if (!_.isEqual(app.arrays[stepCounter], array)) {
                 app.comparisons[stepCounter] = null;
                 app.movements[stepCounter] = null;
                 app.arrays.push([...array]);
                 stepCounter++;
             }
        }
         // Nullify comparison/movement for the state *after* partition finishes
         app.comparisons[stepCounter] = null;
         app.movements[stepCounter] = null;
         // Padding handled by caller (quickSort/mergeSort)

        return i + 1;
    },

    mergeSort(app, array, left, right) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);

            this.mergeSort(app, array, left, mid);
            this.mergeSort(app, array, mid + 1, right);

            this.merge(app, array, left, mid, right);
        }
    },

    merge(app, array, left, mid, right) {
        const n1 = mid - left + 1;
        const n2 = right - mid;

        // Create temp arrays
        const L = new Array(n1);
        const R = new Array(n2);

        // Copy data to temp arrays
        for (let i = 0; i < n1; i++) {
            L[i] = array[left + i];
        }
        for (let j = 0; j < n2; j++) {
            R[j] = array[mid + 1 + j];
        }

        // Merge temp arrays back into array[left..right]
        // Use different variable names for the merge loop indices
        let idxL = 0; // index for L
        let idxR = 0; // index for R
        let k = left; // index for merged array
        let stepCounter = app.arrays.length - 1; // Start from the last recorded state index

        // State before merge loop exists (arrays[stepCounter])
        // Record initial comparison for the *next* state
        app.comparisons[stepCounter] = (idxL < n1 && idxR < n2) ? [left + idxL, mid + 1 + idxR] : null;
        app.movements[stepCounter] = null;

        while (idxL < n1 && idxR < n2) {
            // Record comparison for the *next* state
            // The indices compared are conceptual indices within the original array range
            app.comparisons[stepCounter] = [left + idxL, mid + 1 + idxR];
            app.movements[stepCounter] = null; // No movement yet for comparison step

            // Record state showing the comparison
            app.arrays.push([...array]);
            stepCounter++;

            if (L[idxL] <= R[idxR]) {
                // Check if a move/write is actually happening
                if (array[k] !== L[idxL]) {
                    // Record movement (write from L) for the *next* state
                    app.comparisons[stepCounter] = null;
                    // Target k, Source is the conceptual original position of L[idxL]
                    app.movements[stepCounter] = [k, left + idxL];

                    array[k] = L[idxL];

                    // Record array state *after* write
                    app.arrays.push([...array]);
                    stepCounter++;
                }
                idxL++;
            } else {
                 // Check if a move/write is actually happening
                if (array[k] !== R[idxR]) {
                    // Record movement (write from R) for the *next* state
                    app.comparisons[stepCounter] = null;
                     // Target k, Source is the conceptual original position of R[idxR]
                    app.movements[stepCounter] = [k, mid + 1 + idxR];

                    array[k] = R[idxR];

                    // Record array state *after* write
                    app.arrays.push([...array]);
                    stepCounter++;
                }
                idxR++;
            }
            k++;
             // Record comparison for the *next* iteration (if loop continues)
             app.comparisons[stepCounter] = (idxL < n1 && idxR < n2) ? [left + idxL, mid + 1 + idxR] : null;
             app.movements[stepCounter] = null; // Reset movement
        }

        // Copy remaining elements of L[] if any
        while (idxL < n1) {
             // Check if a move/write is actually happening
            if (array[k] !== L[idxL]) {
                // Record movement for the *next* state
                app.comparisons[stepCounter] = null;
                app.movements[stepCounter] = [k, left + idxL];

                array[k] = L[idxL];

                // Record array state after change
                app.arrays.push([...array]);
                stepCounter++;
            }
            idxL++;
            k++;
             // Nullify comparison/movement for next state within this loop
             app.comparisons[stepCounter] = null;
             app.movements[stepCounter] = null;
        }

        // Copy remaining elements of R[] if any
        while (idxR < n2) {
             // Check if a move/write is actually happening
            if (array[k] !== R[idxR]) {
                // Record movement for the *next* state
                app.comparisons[stepCounter] = null;
                app.movements[stepCounter] = [k, mid + 1 + idxR];

                array[k] = R[idxR];

                // Record array state after change
                app.arrays.push([...array]);
                stepCounter++;
            }
            idxR++;
            k++;
             // Nullify comparison/movement for next state within this loop
             app.comparisons[stepCounter] = null;
             app.movements[stepCounter] = null;
        }
         // Ensure comparisons/movements arrays are padded by caller (mergeSort)
    },

    // Helper function to get the maximum value in an array
    getMax(arr) {
        if (!arr || arr.length === 0) return 0; // Handle empty or null array
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    },

    // Helper function for Radix Sort: Counting Sort based on digit represented by exp
    countingSortForRadix(app, array, exp) {
        const n = array.length;
        const output = new Array(n).fill(0);
        const count = new Array(10).fill(0); // Digits 0-9
        let stepCounter = app.arrays.length - 1;

        // Store count of occurrences in count[]
        for (let i = 0; i < n; i++) {
            const digit = Math.floor(array[i] / exp) % 10;
            count[digit]++;
            // Record state showing the element being examined
            app.comparisons[stepCounter] = [i, null]; // Indicate examining element i for its digit
            app.movements[stepCounter] = null;
            app.arrays.push([...array]); // Record state for each element examined
            stepCounter++;
        }

        // Change count[i] so that count[i] now contains actual
        // position of this digit in output[]
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // Build the output array
        // Iterate backwards to maintain stability
        for (let i = n - 1; i >= 0; i--) {
            const digit = Math.floor(array[i] / exp) % 10;
            const outputIndex = count[digit] - 1;
            output[outputIndex] = array[i];
            count[digit]--;

            // Record movement: element from index 'i' moves to 'outputIndex'
            // Record this *before* pushing the state, so the arc starts from the correct position
            app.comparisons[stepCounter] = null; // No comparison during placement
            app.movements[stepCounter] = [outputIndex, i]; // Target index, Source index
            // Record the state *before* the conceptual move happens in the main array visualization
            app.arrays.push([...array]);
            stepCounter++;
            // Nullify comparison/movement for the *next* state (which will be the next iteration's comparison/move)
            app.comparisons[stepCounter] = null;
            app.movements[stepCounter] = null;
        }

        // Copy the output array to array[], so that array[] now
        // contains sorted numbers according to current digit
        // Visualize the state *after* the full copy, not individual element copies
        let changed = false;
        for (let i = 0; i < n; i++) {
            if (array[i] !== output[i]) {
                 array[i] = output[i];
                 changed = true;
            }
        }
        // If the array changed after the copy, record the final state for this digit pass
        if (changed) {
             app.comparisons[stepCounter] = null;
             app.movements[stepCounter] = null; // No specific movement for the final state view
             app.arrays.push([...array]);
             stepCounter++;
        }
         // Nullify comparison/movement for the state *after* this pass finishes (start of next pass or end of sort)
         app.comparisons[stepCounter] = null;
         app.movements[stepCounter] = null;
    },

    radixSort(app, array) {
        if (!array || array.length === 0) return;

        // Find the maximum number to know number of digits
        const max = this.getMax(array);

        // Do counting sort for every digit. Note that instead
        // of passing digit number, exp is passed. exp is 10^i
        // where i is current digit number
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            this.countingSortForRadix(app, array, exp);
            // State after each full pass of counting sort is recorded within countingSortForRadix
        }
        // Final sorted state is the last one recorded by countingSortForRadix
    }
};
