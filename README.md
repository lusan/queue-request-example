# API Sequential Request Handler

This solution provides a mechanism to queue API requests for specific base URLs, ensuring that they are sent out sequentially. It's especially useful when you need to prevent concurrency for particular endpoints.

## Table of Contents

- [Setup](#setup)
- [Usage](#usage)
- [Files Overview](#files-overview)

## Setup

Place the following files in your project directory:
   - `apiQueue.js`
   - `apiCaller.js`

## Usage

1. Whenever you need to make an API call, import the `apiCaller` module and use the desired HTTP method:

   ```javascript
   import apiCaller from './apiCaller';

   apiCaller.get('https://example.com/data/1').then(response => {
       console.log(response.data);
   });
   ```

2. To queue requests for specific base URLs, simply add them to the `queueBaseURLs` array in `apiQueue.js`.

## Files Overview

### 1. `apiQueue.js`

This file manages the queue of API requests. It contains:

- **queueBaseURLs**: An array of base URLs for which requests should be queued.
  
- **apiQueue**: An internal array that stores the queued requests.
  
- **isRequestInProgress**: A flag indicating whether there's an ongoing API request.
  
- **processNextRequest**: A function that processes the next request in the queue. If a request is already in progress or the queue is empty, it does nothing. Otherwise, it dequeues the next request, sends it, and upon completion, processes the next queued request.
  
- **enqueueRequest**: Given a request configuration, this function determines whether to queue the request or send it immediately. If the request's baseURL or origin matches one in `queueBaseURLs`, it gets queued; otherwise, it's sent immediately.

### 2. `apiCaller.js`

This file provides a generic API caller built on top of the queuing mechanism. It contains helper methods for different HTTP methods (`get`, `post`, `put`, etc.), and internally uses `enqueueRequest` from `apiQueue.js` to handle the actual sending.

## Conclusion

This solution offers a simple yet effective way to manage API request concurrency for specific base URLs. By leveraging the power of Axios and JavaScript promises, it ensures that API calls for designated URLs are executed in a strictly sequential order. This is beneficial when dealing with APIs that have concurrency limits or when preserving the order of operations is crucial.