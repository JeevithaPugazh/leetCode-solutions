function maxTaskAssign(tasks, workers, pills, strength) {
  // Step 1: Sort tasks and workers
  tasks.sort((a, b) => a - b);
  workers.sort((a, b) => a - b);

  // Step 2: Binary search for maximum tasks
  let left = 0; 
  let right = Math.min(tasks.length, workers.length); 
  let result = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2); 
    if (canAssign(mid, tasks, workers, pills, strength)) {
      result = mid;
      left = mid + 1; // try more
    } else {
      right = mid - 1; // try fewer
    }
  }
  return result;
}

function canAssign(k, tasks, workers, pills, strength) {
  let i = k - 1; // hardest task index among k 
  let j = workers.length - 1; // strongest worker index 
  let pillsLeft = pills; 

    // Step 3: Check if we can assign k tasks

  for (; i >= 0; i--) {
    // If strongest worker can do task
    if (j >= workers.length - k && workers[j] >= tasks[i]) {
      j--; // assign strongest worker
    } 
    // Else try with weakest worker + pill
    else if (j >= workers.length - k && workers[j] + strength >= tasks[i] && pillsLeft > 0) {
      pillsLeft--;
      j--; // give pill to this worker
    } else {
      return false; // task cannot be done
    }
  }
  return true;
}

// Example run
console.log(maxTaskAssign([3, 5, 8], [2, 4, 6], 1, 3)); // ✅