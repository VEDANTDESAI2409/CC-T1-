#include<stdio.h>

// Function for Sequential Search
int sequentialSearch(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            return i; // Return the index where target is found
        }
    }
    return -1; // Target not found
}

// Function for Binary Search (array must be sorted)
int binarySearch(int arr[], int size, int target) {
    int left = 0;
    int right = size - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid; // Target found at mid
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    return -1; // Target not found
}

int main() {
    int arr[] = {2, 4, 6, 8, 10, 12, 14};
    int size = sizeof(arr) / sizeof(arr[0]);
    int target = 10;

    // Sequential Search
    int seqIndex = sequentialSearch(arr, size, target);
    if (seqIndex != -1) {
        printf("Sequential Search: Element %d found at index %d\n", target, seqIndex);
    } else {
        printf("Sequential Search: Element %d not found\n", target);
    }

    // Binary Search
    int binIndex = binarySearch(arr, size, target);
    if (binIndex != -1) {
        printf("Binary Search: Element %d found at index %d\n", target, binIndex);
    } else {
        printf("Binary Search: Element %d not found\n", target);
    }

    return 0;
}
