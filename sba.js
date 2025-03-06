// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

//My Code

function dueYet(ag, ls) {
  let dueAssignments = []; //initialize empty array of only assingments that are due
  for (let entry of ag.assignments) {
    //for every element in assignment group
    let dueDate = new Date(entry.due_at);
    let currentDate = Date.now();
    if (dueDate < currentDate) {
      //compare due date of assignment to current date
      for (let submission of ls) {
        if (submission.assignment_id == entry.id) {
          dueAssignments.push(submission); //push the corresponding submission (by assignment_id) to dueAssignments array
        }
      }
    }
  }
  return dueAssignments;
}

let submittedDueAssignments = dueYet(AssignmentGroup, LearnerSubmissions);

// console.log(submittedDueAssignments);

function isLate(ag, ls) {
  for (let entry of ag.assignments) {
    //for every element in assignment group
    let dueDate = new Date(entry.due_at);
    for (let submission of ls) {
      if (submission.assignment_id === entry.id) {
        let submissionDate = new Date(submission.submission.submitted_at);
        if (submissionDate > dueDate) {
          //compare due date of assignment to submission date
          submission.isLate = true;
          submission.latePenalty = 0.1 * entry.points_possible; //adds a latePenalty key equal to 10% of maximum points
        } else {
          submission.isLate = false;
        }
      }
    }
  }
  return ls;
}
checkOnTime = isLate(AssignmentGroup, submittedDueAssignments);
// console.log(checkOnTime);

// invoke as getScore(dueYet(AssignmentGroup, LearnerSubmissions)) to only get due assignments
function getScore(ls) {
  let scores = {}; //initialize scores as an empty object
  for (let entry of ls) {
    //for every element in the ls array,
    if (entry.isLate === false) {
      scores[entry.learner_id] = 0; //create key of (value of) learner_id and initialize value of 0
      scores[entry.learner_id] += entry.submission.score;
    } //go through every entry for each learner_id and add submission.score to it
    else {
      scores[entry.learner_id] = 0;
      scores[entry.learner_id] += entry.submission.score - entry.latePenalty;
    }
  }
  return scores; //return object with keys of learner_id and values of total scores
}

console.log(getScore(checkOnTime));
//todo: change getScore() to give average of scores
// omit assignments that aren't due yet -- done
// deduct 10% of total points possible if assignment is late
// add error if assignment group doesn't match course id
// add error if points_possible = 0
// put everything into getLearnerData()

// console.log(getScore(isLate(AssignmentGroup, LearnerSubmissions)));

// function getLearnerData(course, ag, submissions) {}
