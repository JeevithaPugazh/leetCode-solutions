const maxTaskAssign = function(tasks, workers, pills, strength) {
    tasks.sort((a, b) => a - b);
    workers.sort((a, b) => a - b);

    // Helper function to check if it's possible to finish k tasks
    const canFinish = (k) => {
        let pills_left = pills;
        const worker_deque = [];
        
        // Populate the deque with the k strongest workers
        for (let i = 0; i < k; i++) {
            worker_deque.push(workers[workers.length - k + i]);
        }

        // Iterate through the k hardest tasks
        for (let i = k - 1; i >= 0; i--) {
            const task_req = tasks[i];

            // If the strongest available worker can do the task without a pill
            if (worker_deque.length > 0 && worker_deque[worker_deque.length - 1] >= task_req) {
                worker_deque.pop(); // Assign the strongest worker to the hardest task
            } else if (pills_left > 0 && worker_deque.length > 0 && worker_deque[0] + strength >= task_req) {
                // If not, and pills are available, use a pill on the weakest available worker
                pills_left--;
                worker_deque.shift();
            } else {
                return false; // Cannot assign this task
            }
        }
        return true;
    };

    let left = 0;
    let right = Math.min(tasks.length, workers.length);
    let ans = 0;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (canFinish(mid)) {
            ans = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return ans;
};