var studentName = document.querySelectorAll("#student-name")[0];
var fatherName = document.querySelectorAll("#father-name")[0];
var rollNumber = document.querySelectorAll("#roll-number")[0];
var classTime = document.querySelectorAll(".class-time");
var subjects = document.querySelectorAll("#subject")[0];

var div = document.querySelectorAll('#students-data')[0];

var userMsg = document.querySelectorAll('.msg-user')[0];

function formSubmit() {
  var selectedTime;
  for (var i = 0; i < classTime.length; i++) {
    if (classTime[i].checked) {
      selectedTime = classTime[i].value;
      break;
    }
  }

  var studentInfo = {
    stName: studentName.value,
    fName: fatherName.value,
    rollNum: rollNumber.value,
    subject: subjects.value,
    selectedTime: selectedTime
  };

  if (
    studentInfo.stName &&
    studentInfo.fName &&
    studentInfo.rollNum &&
    studentInfo.selectedTime &&
    studentInfo.subject
  ) {
    printStudentData(studentInfo);
    saveStudentInDB(studentInfo);
    
  } else {
    userMsg.innerHTML = "All Fields Are Required!!!";
    setTimeout(function () {
      userMsg.innerHTML = "";
    }, 3000);
  }

  studentName.value = '';
  fatherName.value = '';
  rollNumber.value = '';
  subjects.value = '';
}

//==================================================================

function printStudentData(studentInfo) {
  printWithBacktick(studentInfo);
}

function printWithBacktick(studentInfo) {
  var data = "<div id='data-" + allStudentsData.length + "' style='border: 1px solid black; margin: 15px; padding: 15px;'> " +
    "<div>" + studentInfo.stName + "</div>" +
    "<div>" + studentInfo.fName + "</div>" +
    "<div>" + studentInfo.rollNum + "</div>" +
    "<div>" + studentInfo.selectedTime + "</div>" +
    "<div>" + studentInfo.subject + "</div>" +
    "<button onclick='removeData(this, \"" + studentInfo.stName + "\")'>Delete</button>" +
    "</div>";
  div.innerHTML += data;
}


//==================================================================

var allStudentsData = [];

function getStudentsData() {
  var studentsData = localStorage.getItem("studentsData");
  if (studentsData) {
    allStudentsData = JSON.parse(studentsData);
  }
  console.log(allStudentsData);
  for (var i = 0; i < allStudentsData.length; i++) {
    printWithBacktick(allStudentsData[i]);
  }
}

getStudentsData();

//==================================================================

function saveStudentInDB(studentInfo) {
  allStudentsData.push(studentInfo);
  localStorage.setItem("studentsData", JSON.stringify(allStudentsData));
}

//==================================================================

function removeData(button) {
  
  var dataToRemove = button.parentNode;
var index = Array.from(div.children).indexOf(dataToRemove);

  dataToRemove.parentNode.removeChild(dataToRemove);

  allStudentsData.splice(index, 1);
  localStorage.setItem("studentsData", JSON.stringify(allStudentsData));
}


