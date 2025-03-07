I broke the assignment into several different functions that break the data into more manageable pieces.

dueYet() returns only assignments that are due.

isLate() determines if an assignment was submitted late and assigns a 10% late penalty. it also extracts the max points from the assignments and returns it along with the other data.

getResult() sorts the data by learner_id, and assigns values to the return for each assignment. This code is a mess and I'm sure it would break with larger data collections, but at least it works for the data given for this assignment.

refineResult() filters out null elements from getResult, calculates the total average, only outputs the necessary data for the final result.

getLearnerData() takes the given data as parameters and checks if assignments match the course, throwing an error if not. It then calls all of the previous functions with the given parameters and then returns the final result.

This assignment was very challenging, and I could not have done it without the support of my vscode pet froggy.
