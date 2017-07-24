/* JS for WATS 3020 Roster Project */


// Base class called `Person` that takes the parameters `name`
// and `email` and makes those available as attributes. 
class Person {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.username = email.split('@')[0]; // creates the username by seperating it from the emailing address
  }
}


// A new class called 'Student" that extends the `Person`.
// The `Student` class should add a line to the `constructor()` method that sets
// the property `this.attendance` to an empty Array (`[ ]`). The `attendance`
// property will be used to record and track attendance.

class Student extends Person {
  constructor(name, email) {
    super(name, email);// brings in the information from the contructor method in the 'Person' class. 
    this.attendance = [];// starts the framework that allows the tracking of attendance. 
  }
 
// Method on the `Student` class called `calculateAttendance` that gives a percentage of how many days the student was present.
// Attendance should be recorded into an Array using either a `0` for "absent" or a `1` for "present".
// This should allow attendance percentage to be calculated as the average of
// all the items in the `attendance` Array.


   calculateAttendance(){
         if (this.attendance.length > 0) {
             let counter = 0;
             for (let mark of this.attendance){
                 counter = counter + mark;
             }
             let attendancePercentage = counter / this.attendance.length * 100;
             return `${attendancePercentage.toFixed(2)}%`;
         } else {
            return "0%";
       }
  }
}

// Class that extends the `Person` class called `Teacher`.
// The `Teacher` class should add a property called `this.honorific` (supplied
// when an instance of `Teacher` is created).
class Teacher extends Person {
  constructor(name, email, honorific) {
    super(name, email, honorific);
    this.honorific = honorific;
  }
}

// Set up our Course class so we can run the whole roster from it.
class Course {
    constructor(courseCode, courseTitle, courseDescription){
        this.code = courseCode;
        this.title = courseTitle;
        this.description = courseDescription;
        this.teacher = null;
        this.students = [];
    }

    /////////////////////////////////////////
    // The `addStudent()` method /////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //
    // Create a method called `addStudent()` that prompts the user for
    // information required to create a new `Student` object (`name`, `email`)
    // and does so, then adds the student to the `this.students` Array. Be sure
    // to update the roster display by calling `updateRoster()`. You will need
    // to reference the Class instance using `this` as a parameter for
    // `updateRoster()`, so it might look like this: `updateRoster(this)`.
addStudent(){
     let name = prompt('Enter your full name:');
     let email = prompt('Enter your email address:');
     let newStudent = new Student(name, email);
     this.students.push(newStudent);
     updateRoster(this);
    }
    /////////////////////////////////////////
    // The `setTeacher()` method /////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //
    // Create a method called `setTeacher()` that prompts the user for the
    // information required to create a `Teacher` object (`name`, `email`) and
    // does so, then sets the `this.teacher` property equal to the new `Teacher` object.

  setTeacher(){
    let name = prompt('Please enter your name.');
    let email = prompt('What is your email address?');
    let honorific = prompt('What is your title?');
    this.teacher = new Teacher(name, email, honorific);
    updateRoster(this);
  }

    /////////////////////////////////////////
    // The `markAttendance()` method /////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //
    // A method to mark a student's attendance called `markAttendance()`.
    // This method should accept a parameter called `username` containing the
    // `username` that will match the `username` property on the `Student` object.

    markAttendance(username, status='present'){
      let student = this.findStudent(username);// retreive the 'Student" object out of the 'this.students' array. 
      if (status === 'present'){
        student.attendance.push(1);
    }else{
      student.attendance.push(0);// adds attendance mark to the array
    }
      updateRoster(this);// updates student attendance status on the live site. 
   }
    


    //////////////////////////////////////////////
    // Methods provided for you -- DO NOT EDIT /////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    findStudent(username){
        // This method provided for convenience. It takes in a username and looks
        // for that username on student objects contained in the `this.students`
        // Array.
        let foundStudent = this.students.find(function(student, index){
            return student.username == username;
        });
        return foundStudent;
      }
    }

/////////////////////////////////////////
// Prompt User for Course Info  //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//
// Prompt the user for the `courseCode` (the number/code of the course, like "WATS 3000").
let courseCode = prompt('Provide the code for the course you are looking for. (e.g. CRWR 1050).');

// Prompt the user for the `courseTitle` (the name of the course, like "Introduction to JavaScript").
let courseTitle = prompt('What is the name of your course?');

// Prompt the user for the  `courseDescription` (the descriptive summary of the course).
let courseDescription = prompt('Please provide a brief description of your course.')

// Create a new `Course` object instance called `myCourse` using the three data points collected from the user.
let myCourse = new Course(courseCode, courseTitle, courseDescription);

///////////////////////////////////////////////////
//////// Main Script /////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// This script runs the page. You should only edit it if you are attempting a //
// stretch goal. Otherwise, this script calls the functions that you have     //
// created above.                                                             //
////////////////////////////////////////////////////////////////////////////////

let rosterTitle = document.querySelector('#course-title');
rosterTitle.innerHTML = `${myCourse.code}: ${myCourse.title}`;

let rosterDescription = document.querySelector('#course-description');
rosterDescription.innerHTML = myCourse.description;

if (myCourse.teacher){
    let rosterTeacher = document.querySelector('#course-teacher');
    rosterTeacher.innerHTML = `${myCourse.teacher.honorific} ${myCourse.teacher.name}`;
} else {
    let rosterTeacher = document.querySelector('#course-teacher');
    rosterTeacher.innerHTML = "Not Set";
}

let rosterTbody = document.querySelector('#roster tbody');
// Clear Roster Content
rosterTbody.innerHTML = '';

// Create event listener for adding a student.
let addStudentButton = document.querySelector('#add-student');
addStudentButton.addEventListener('click', function(e){
    console.log('Calling addStudent() method.');
    myCourse.addStudent();
})

// Create event listener for adding a teacher.
let addTeacherButton = document.querySelector('#add-teacher');
addTeacherButton.addEventListener('click', function(e){
    console.log('Calling setTeacher() method.');
    myCourse.setTeacher();
})

// Call Update Roster to initialize the content of the page.
updateRoster(myCourse);

function updateRoster(course){
    let rosterTbody = document.querySelector('#roster tbody');
    // Clear Roster Content
    rosterTbody.innerHTML = '';
    if (course.teacher){
        let rosterTeacher = document.querySelector('#course-teacher');
        rosterTeacher.innerHTML = `${course.teacher.honorific} ${course.teacher.name}`;
    } else {
        let rosterTeacher = document.querySelector('#course-teacher');
        rosterTeacher.innerHTML = "Not Set";
    }
    // Populate Roster Content
    for (student of course.students){
        // Create a new row for the table.
        let newTR = document.createElement('tr');

        // Create table cells for each data point and append them to the new row.
        let nameTD = document.createElement('td');
        nameTD.innerHTML = student.name;
        newTR.appendChild(nameTD);

        let emailTD = document.createElement('td');
        emailTD.innerHTML = student.email;
        newTR.appendChild(emailTD);

        let attendanceTD = document.createElement('td');
        attendanceTD.innerHTML = student.calculateAttendance();
        newTR.appendChild(attendanceTD);

        let actionsTD = document.createElement('td');
        let presentButton = document.createElement('button');
        presentButton.innerHTML = "Present";
        presentButton.setAttribute('data-username', student.username);
        presentButton.setAttribute('class', 'present');
        actionsTD.appendChild(presentButton);

        let absentButton = document.createElement('button');
        absentButton.innerHTML = "Absent";
        absentButton.setAttribute('data-username', student.username);
        absentButton.setAttribute('class', 'absent');
        actionsTD.appendChild(absentButton);

        newTR.appendChild(actionsTD);

        // Append the new row to the roster table.
        rosterTbody.appendChild(newTR);
    }
    // Call function to set event listeners on attendance buttons.
    setupAttendanceButtons();
}

function setupAttendanceButtons(){
    // Set up the event listeners for buttons to mark attendance.
    let presentButtons = document.querySelectorAll('.present');
    for (button of presentButtons){
        button.addEventListener('click', function(e){
            console.log(`Marking ${e.target.dataset.username} present.`);
            myCourse.markAttendance(e.target.dataset.username);
            updateRoster(myCourse);
        });
    }
    let absentButtons = document.querySelectorAll('.absent');
    for (button of absentButtons){
        button.addEventListener('click', function(e){
            console.log(`Marking ${e.target.dataset.username} absent.`);
            myCourse.markAttendance(e.target.dataset.username, 'absent');
            updateRoster(myCourse);
        });
    }
}

