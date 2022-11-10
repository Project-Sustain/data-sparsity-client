/**
 * Modified from https://www.geeksforgeeks.org/binary-search-in-javascript/
 * 
 * This function is a boiler-plate binary search for a REVERSE ordered list
 */

export const binary_search = (arr, x, start, end) => {
    if (start > end) return start;
    const mid = Math.floor((start + end)/2);
    if (arr[mid] === x) return mid;
    if(arr[mid] > x) {
        return binary_search(arr, x, mid+1, end);
    }
    else {
        return binary_search(arr, x, start, mid-1);
    }
}

/**
 * https://www.geeksforgeeks.org/search-insert-position-of-k-in-a-sorted-array/
 */

export const find_index = (arr, K) => {
    let start = 0;
    let end = arr.length-1;
 
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
 
        if (arr[mid] === K)
            return mid;
 
        else if (arr[mid] < K)
            start = mid + 1;
 
        else
            end = mid - 1;
    }
 
    return end + 1;
}