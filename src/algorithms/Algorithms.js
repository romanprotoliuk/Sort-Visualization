// final version
export const MergeSort = (arr) => {
	const animHistory = [];
	if (arr.length <= 1) return arr;
	const cloneArr = arr.slice();
	mergeSortHelper(arr, 0, arr.length - 1, cloneArr, animHistory);
	return animHistory;
};

const mergeSortHelper = (arr, left, right, cloneArr, animations) => {
	if (left === right) return;
	const center = Math.floor((left + right) / 2);
	mergeSortHelper(cloneArr, left, center, arr, animations);
	mergeSortHelper(cloneArr, center + 1, right, arr, animations);
	doMerge(arr, left, center, right, cloneArr, animations);
};

const doMerge = (mainArray, left, center, right, cloneArr, animations) => {
	let k = left,
		i = left,
		j = center + 1;

	// Break down what array location this is
	// [3, 1, 2, 6, 8, 4, 6, 3] - example array
	// [0, 1, 2, 3, 4, 5, 6, 7] - corresponding indexes
	// in the code below
	// i = 0 , center = 3, j = 4, right = 7
	// while 0 <= 3 and 4 <= 7
	while (i <= center && j <= right) {
		animations.push([ i, j ]); // we change the color of the two indexes
		animations.push([ i, j ]); // revert the color change

		if (cloneArr[i] <= cloneArr[j]) {
			animations.push([ k, cloneArr[i] ]); // we overwrite the value arr[i] at position k
			mainArray[k++] = cloneArr[i++];
		} else {
			animations.push([ k, cloneArr[j] ]); // we overwrite the value arr[j] at postion k
			mainArray[k++] = cloneArr[j++];
		}
	}

	// Break down what array location this is
	// [3, 1, 2, 6, 8, 4, 6, 3] - example array
	// [0, 1, 2, 3, 4, 5, 6, 7] - corresponding indexes
	// in the code below
	// i = 0 , center = 3
	// while 0 <= 3
	while (i <= center) {
		// same as above while statement
		animations.push([ i, i ]);
		animations.push([ i, i ]);

		animations.push([ k, cloneArr[i] ]);
		mainArray[k++] = cloneArr[i++];
	}

	// Break down what array location this is
	// [3, 1, 2, 6, 8, 4, 6, 3] - example array
	// [0, 1, 2, 3, 4, 5, 6, 7] - corresponding indexes
	// in the code below
	// j = 4, right = 7
	// while 4 <= 7
	while (j <= right) {
		// same as above
		animations.push([ j, j ]);
		animations.push([ j, j ]);

		animations.push([ k, cloneArr[j] ]);
		mainArray[k++] = cloneArr[j++];
	}
};

// first unsuccessful implementation for merge sort
// this is a great solution but you cannot track animation history with this algorithm
// const mergeSort = (arr) => {
// 	if (arr.length === 1) {
// 		return arr;
// 	}

// 	const center = Math.floor(arr.length / 2);
// 	const left = arr.slice(0, center);
// 	const right = arr.slice(center);

// 	return merge(mergeSort(left), mergeSort(right));
// };

// const merge = (left, right) => {
// 	const results = [];

// 	while (left.length && right.length) {
// 		if (left[0] < right[0]) {
// 			results.push(left.shift());
// 		} else {
// 			results.push(right.shift());
// 		}
// 	}

// 	return [ ...results, ...left, ...right ];
// };
