/**
 * Asynchronous Programming - JavaScript
 * 
 * Non-blocking code execution using callbacks, promises, and async/await.
 */

// Callbacks
function fetchDataCallback(url, callback) {
    setTimeout(() => {
        callback(null, { data: `Data from ${url}` });
    }, 1000);
}

// Promises
function fetchDataPromise(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve({ data: `Data from ${url}` });
            } else {
                reject(new Error('Invalid URL'));
            }
        }, 1000);
    });
}

// Async/Await
async function fetchDataAsync(url) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: `Data from ${url}` };
}

// Parallel execution
async function fetchMultiple(urls) {
    const promises = urls.map(url => fetchDataAsync(url));
    return await Promise.all(promises);
}

// Race condition
async function fetchWithTimeout(url, timeout) {
    const fetchPromise = fetchDataAsync(url);
    const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), timeout)
    );
    return await Promise.race([fetchPromise, timeoutPromise]);
}

// Example usage
console.log('=== Asynchronous Programming ===\n');

// Callback
fetchDataCallback('/api/users', (err, data) => {
    console.log('Callback result:', data);
});

// Promise
fetchDataPromise('/api/posts')
    .then(data => console.log('Promise result:', data))
    .catch(err => console.error('Error:', err));

// Async/Await
(async () => {
    const data = await fetchDataAsync('/api/comments');
    console.log('Async result:', data);
    
    // Parallel
    const results = await fetchMultiple(['/api/1', '/api/2', '/api/3']);
    console.log('Parallel results:', results);
})();

module.exports = { fetchDataCallback, fetchDataPromise, fetchDataAsync, fetchMultiple };

