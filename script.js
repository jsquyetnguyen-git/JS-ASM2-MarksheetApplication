let stt = 0;

//Contructor
function Student(name, mathScore, physicalScore, chemistryScore) {
    this.name = name;
    this.mathScore = mathScore;
    this.physicalScore = physicalScore;
    this.chemistryScore = chemistryScore;
}

//Add new student from input form.
document.getElementById('addBtn').addEventListener('click', function() {
    let name = getValue('get-name');
    let math = getValue('get-mathscore');
    let physic = getValue('get-physcore');
    let chemistry = getValue('get-chescore');

    //condition of all fields: can not be blank.
    if (name == '' || math == '' || physic == '' || chemistry == '') {
        alert("Please fill in all of fields!");
        return;
    }

    //get name with condition: name must be string
    if (!isNaN(name)) {
        alert('Name can not be numeric.\nPlease re-enter!');
        return;
    }

    //get score with condition: must be numeric between 0 and 10
    if (isNaN(math) || math < 0 || math > 10) {
        alert('Math score must be numeric from 0-10.\nPlease re-enter!');
        return;
    }

    if (isNaN(physic) || physic < 0 || physic > 10) {
        alert('Physics score must be numeric from 0-10.\nPlease re-enter!');
        return;
    }

    if (isNaN(chemistry) || chemistry < 0 || chemistry > 10) {
        alert('Chemistry score must be numeric from 0-10.\nPlease re-enter!');
        return;
    }

    //declare new object and call function to insert into table
    let newStudent = new Student(name, math, physic, chemistry);
    insertStudent(newStudent);
    //clearing input form after add
    clearForm();
})

function getValue(id) {
    return document.getElementById(id).value.trim();
}

//Insert new student to new row in data table
function insertStudent(newStudent) {
    /*this variable is numerical order
    It will be increased by 1 unit when a new student are added.
    */
    stt++;
    let table = document.getElementById("data-table");
    //add new row to the end of the table:
    let row = table.insertRow(-1);

    row.insertCell(0).innerHTML = stt;
    row.insertCell(1).innerHTML = newStudent.name;
    row.insertCell(2).innerHTML = newStudent.mathScore;
    row.insertCell(3).innerHTML = newStudent.physicalScore;
    row.insertCell(4).innerHTML = newStudent.chemistryScore;
    //set initial value of average mark is '?'
    row.insertCell(5).innerHTML = '?';
    row.insertCell(6).innerHTML = "<i onclick='deleteRow(this)' class='bi bi-trash'></i>";
}

//this function will clear input form
document.getElementById('clearBtn').addEventListener('click', function() {
    clearForm();
})

function clearForm() {
    for (let i = 0; i < 4; i++) {
        document.getElementsByTagName("input")[i].value = '';
    }
}

//calculate average marks
document.getElementById('average').addEventListener('click', function() {
    let table = document.getElementById('data-table');
    let row = table.rows;
    //iterate through rows of table
    for (let i of row) {
        //iterate through cells
        //cell will be accessed if value = ?
        if (i.cells[5].innerText == '?') {
            let mathScore = parseInt(i.cells[2].innerText);
            let phyScore = parseInt(i.cells[3].innerText);
            let cheScore = parseInt(i.cells[4].innerText);
            //Calculate the average score of 3 subjects
            let ave = (mathScore + phyScore + cheScore) / 3;
            //change value of cell to average score
            i.cells[5].innerHTML = ave.toFixed(1);
        }
    }
})

/*this function will change the font color of students
whose average score is greater than 8.0
*/
document.getElementById('showGoodSt').addEventListener('click', function() {
    let table = document.getElementById("data-table");
    let row = table.rows;
    for (let i = 1; i < row.length; i++) {
        if (parseFloat(row[i].cells[5].innerText) >= 8) {
            //change the font color to red
            row[i].style.color = 'red';
        }
    }
})

//Get pdf
document.getElementById('getPDF').addEventListener('click', function() {
    let getTable = document.getElementById('data-table').innerHTML;
    console.log(getTable);

    let style = "<style>";
    style += "table {width: 100%}";
    style += "table, th, td {border: solid 1px;border-collapse: collapse;";
    style += "padding: 2px 3px;text-align: center;}";
    style += "h3{text-align: center;}";
    //remove delete col
    style += "th:last-child,td:last-child{display: none;}";
    style += "</style>";

    // create window object
    let win = window.open('', '', 'height=1080,width=1080');

    win.document.write('<html><head>');
    win.document.write(style);
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write('<table>');
    win.document.write('<h3>CLASS MARKSHEET</h3>');
    win.document.write(getTable);
    win.document.write('</h5>');
    win.document.write('</table></html>');

    win.document.close(); //close windown

    win.print(); //print
})

//search student by name
document.getElementById('searchBtn').addEventListener('click', function() {
    let exist = false;
    //get keyword from user
    let key = document.getElementById('keyinput').value.toLowerCase();

    let table = document.getElementById('data-table');
    let tr = table.getElementsByTagName('tr');
    //iterate through tr tags of table
    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[1];
        //get name of student
        let nameSt = td.innerText;
        //compare to keyword and hide students who don't match the keyword
        if (nameSt.toLowerCase().indexOf(key) != -1) {
            exist = true;
        } else {
            tr[i].style.display = 'none';
        }
    }
    //If don't match, push notice not found and show all of student.
    if (exist == false) {
        alert('Not found!');
        resetDisplay();
    }
})


document.getElementById('resetDisplay').addEventListener('click', function() {
    resetDisplay();
})

//this function will show all of student in table
function resetDisplay() {
    let table = document.getElementById("data-table");
    let tr = table.getElementsByTagName("tr");
    for (let i of tr) {
        i.style.display = "";
    }
}

//this function will sort table by student name.
document.getElementById('sort').addEventListener('click', function() {
    let table = document.getElementById("data-table");
    let row = table.rows;

    //sort by bubble sort algorithm
    for (let i = 1; i < (row.length); i++) {
        console.log(row[i]);
        for (let j = 1; j < (row.length - i); j++) {
            let x = row[j].getElementsByTagName("td")[1];
            let y = row[j + 1].getElementsByTagName("td")[1];

            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                row[j].parentNode.insertBefore(row[j + 1], row[j]);
            }
        }
    }
})

function deleteRow(row) {
    row.parentNode.parentNode.remove();
}

window.addEventListener('beforeunload', function(e) {

    // Chrome requires returnValue to be set
    e.returnValue = '';
    // Cancel the event (this for Firefox, due to Firefox not support for returnValue)
    e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
});