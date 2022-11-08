/**
 * Modified from https://www.geeksforgeeks.org/binary-search-in-javascript/
 */

export const binary_search = (arr, x, start, end) => {
      
    // Base Condition
    if (start > end) return end; // Debug this, might be `return start`
  
    // Find the middle index
    const mid = Math.floor((start + end)/2);
  
    // Compare mid with given key x
    if (arr[mid] === x) return mid;
         
    // If element at mid is greater than x,
    // search in the right half of mid
    if(arr[mid] > x)
        return binary_search(arr, x, mid+1, end);
    else
 
        // If element at mid is smaller than x,
        // search in the left half of mid
        return binary_search(arr, x, start, mid-1);

}