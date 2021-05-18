// // https://leetcode.com/problems/longest-substring-without-repeating-characters/
// //Given a string s, find the length of the longest substring without repeating characters.
// //FIRST ALGO FIRST APPROACH
function lengthOfLongestSubstring(s) {
  //accounts for the edge case where s is an empty string
  if (s.length == 0) return 0;
  //create an anchor to let us know where to slide left back to
  let reset = 0;
  //create our two pointers
  let left = 0;
  let right = 1;
  //create a set bc sets can only hold unique data
  let substringSet = new Set();
  //start the set off holding the very first letter of the string
  substringSet.add(s.charAt(left));
  //create a variable to hold the length of the substring we are currently examining
  let currentRun = 1;
  //create a variable to hold our longest substring yet
  let maxRun = 0;
  //iterate through the data running it against our condition specified by the criteria of the given algo
  //(right < s.length) to ensure that we never go out of bounds
  while (right < s.length) {
    //add the next letter to the set
    substringSet.add(s.charAt(right));
    //check to see if the size of the set is equal to the
    //current run(number of letters we've checked) + 1(the letter we are checking on this iteration)
    if (substringSet.size == currentRun + 1) {
      //increment currentRun to reflect the new letter that meets the criteria
      currentRun += 1;
      //slide the window to the right
      right++;
    } else {
      //because sets can only accept unique data
      //if the size of our set does not match the current run
      //we know that we must have tried to add a duplicate to the set
      if (currentRun > maxRun) {
        //we only reset the value of maxRun if currentRun has broken our previous
        //record for longest unique substring
        maxRun = currentRun;
      }
      //now we reset our set and slide our window's left to the letter immedately to the right
      // of the first appearance of the duplicated letter
      //we know the index of that letter because we have captured it as our anchor in the
      //variable reset
      substringSet.clear();
      //we must increment reset to hold our place
      //bc we will have to slide our window's left to this index(reset) if we encounter another duplicate value
      reset++;
      left = reset;
      //we slide our window's right to the letter immediately following left and begin again
      right = left + 1;
      //we start our new set with the last known unique letter which we captured at index reset
      substringSet.add(s.charAt(reset));
      //we must reset currentRun to 1 because the previous run was broken with a duplicate
      //and now we are starting over with only one letter in our new run
      currentRun = 1;
    }
  }
  //we repeat this here to account for the edge case when the entire array meets the condition
  // in that case the else would never run so we must compate currentRun to maxRun
  if (currentRun > maxRun) {
    maxRun = currentRun;
  }
  console.log(maxRun);
  return maxRun;
}

lengthOfLongestSubstring("abcabcbb"); //3
//     // lengthOfLongestSubstring("bbbbb"); //1
//     // lengthOfLongestSubstring("pwwkew"); //3
//     // lengthOfLongestSubstring(""); //0
//     //  lengthOfLongestSubstring("dvdf"); //3

// //  SECOND ALGO => SLIDING WINDOW PATTERN from colt steele's course
// // accepts an array of numbers and an integer
////returns the largest some of integer# consecutive elements
// function maxSubarraySum(arr, num) {
//   let maxSum = 0;
//   let tempSum = 0;
//   if (arr.length < num) return null;
//   for (let i = 0; i < num; i++) {
//     maxSum += arr[i];
//     console.log(maxSum);
//     //1stpass  i = 0 maxSum += arr[i] => 0 + 1
//     //2ndpass  i = 1 maxSum += arr[i] => 1 + 2
//     //3rdpass  i = 2 maxSum += arr[i] => 3 + 5
//     //4thpass  i = 3 maxSum += arr[i] => 8 + 2
//     //5thpass  i = 4 => 4 !< num the loop breaks
//     //maxSum = 10
//   }
//   tempSum = maxSum;
//   //tempSum = 10
//   for (let i = num; i < arr.length; i++) {
//     //i = 4 ; i < 7; i++
//     tempSum = tempSum - arr[i - num] + arr[i];
//     console.log(tempSum);
//     //1stpass  tempSum = tempSum - arr[i - num] + arr[i]; =>
//     //10 - arr[4-4] + arr[4] => 10 - arr[0] + arr[4] =>
//     //10 - 1 + 8  => 17
//     //maxSum = Math.max(maxSum, tempSum) => Math.max(10, 17)
//     //maxSum = 17

//     //2ndpass  tempSum = tempSum - arr[i - num] + arr[i]; =>
//     //17 - arr[5-4] + arr[5] => 17 - arr[1] + arr[5] =>
//     //17 - 2 + 1 => 16
//     //maxSum = Math.max(maxSum, tempSum) => Math.max(17, 16)
//     //maxSum = 17

//     //3rdpass  tempSum = tempSum - arr[i - num] + arr[i]; =>
//     //tempSum = 16 - arr[6-4] + arr[6] =>
//     //16 - arr[2] + arr[6] =>
//     //16 - 5 + 5 = 16
//     //maxSum = Math.max(maxSum, tempSum) => Math.max(15, 14)
//     //maxSum = 17

//     //4thpass i = 7 7 !< arr.length the loop breaks

//     maxSum = Math.max(maxSum, tempSum);
//   }
//   return maxSum;
// }
// maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4); //17

// // THIRD ALGO
// //very easy SLIDING WINDOW problem
// // https://leetcode.com/problems/longest-continuous-increasing-subsequence/

// // Given an unsorted array of integers nums, return the length of the longest
// //continuous increasing subsequence (i.e. subarray). The subsequence must be
// //strictly increasing.

// // What is the time complexity? : linear O(n)
// function findLengthOfLCS(nums) {
//   console.log("ORIGINAL INPUT", nums);
//   //create our 2 pointers
//   let left = 0;
//   let right = 1;

//   //create a counter to hold our current run
//   let currentRun = 1;

//   //create a max to hold our longest run
//   let maxRun = 0;

//   //loop through our list
//   // the condition `right < nums.length` prevents us from going out of bounds
//   while (right < nums.length) {
//     //set a condition that is tailored to the specific algorithm's criteria
//     if (nums[right] > nums[left]) {
//       console.log(
//         "comparing nums[right] to nums[left]",
//         nums[right],
//         nums[left]
//       );
//       //increment currentRun
//       currentRun += 1;
//       //increment right no matter what
//       right++;
//       //increment left only if the condition is met
//       left++;
//     } else {
//       //the current run has ended, compare it to maxRun
//       //only reset the value of maxRun if currentRun beat maxRun's record
//       // by being larger than maxRun
//       if (currentRun > maxRun) {
//         maxRun = currentRun;
//       }
//       //reset the counter which we have called currentRun
//       //is there any confusion as to why we set it to 1 and not 0?
//       currentRun = 1;
//       //reassign left pointer to right's spot
//       left = right;
//       //increment right no matter what
//       right++;
//     }
//   }
//   //we repeat this here to account for the edge case when the entire array meets the condition
//   if (currentRun > maxRun) {
//     maxRun = currentRun;
//   }
//   console.log(maxRun);
//   return maxRun;
// }
// findLengthOfLCS([1, 3, 5, 4, 7]); //3
// findLengthOfLCS([1, 3, 5, 7]); //4
// findLengthOfLCS([2, 2, 2, 2, 2]); //1

// //4th ALGO
//https://binarysearch.com/problems/Longest-Consecutive-Duplicate-String
// Given a lowercase alphabet string s, return the length of the longest substring with same characters.

// function longestRun(s) {
//   //we set a counter to track the current run
//   let counter = 1;
//   //we set a max to hold our longest run
//   let max = 0;
//   //we set our 2 pointers
//   let left = 0;
//   let right = 1;
//   //we loop through our string
//   //conditon (right <= s.length) prevents us from going out of bounds
//   while (right <= s.length) {
//     //we check whether or not the two letters we are comparing meet the criteria of the given algo
//     if (s[left] === s[right]) {
//       //if yes we slide our window to the right and increment the counter
//       right++;
//       counter++;
//     } else {
//       if (counter > max) max = counter;
//       //if not our run has been broken we must compare the current run to the longest run
//       //we will only reset max if our record for the longest run has been broken by the current run
//       //we reset our counter to 1
//       counter = 1;
//       //we slide our left to the right
//       left = right;
//       //we slide our right to the right
//       right++;
//     }
//   }
//   console.log(max);
//   return max;
// }
// longestRun("abbbba"); //4
// longestRun("aa"); //2;
// longestRun("bbcbb"); //2;
