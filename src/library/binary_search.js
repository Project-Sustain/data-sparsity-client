/**
 * Modified from https://www.geeksforgeeks.org/binary-search-in-javascript/
 * 
 * This function is a boiler-plate binary search for a REVERSE ordered list
 */

export const binary_search = (arr, x, start, end) => {
    if (start > end) return end; // Debug this, might be `return start`
    const mid = Math.floor((start + end)/2);
    if (arr[mid] === x) return mid;
    if(arr[mid] > x) {
        return binary_search(arr, x, mid+1, end);
    }
    else {
        return binary_search(arr, x, start, mid-1);
    }
}