import * as promptSync from 'prompt-sync';
import * as mysql from "mysql2";
/* import { RowDataPacket } from "mysql2"; */


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    password: 'Deeboo49@',
    database: 'crm_database'
});
connection.connect();


/* //CREATE
connection.query('INSERT INTO employees (name, age, position) VALUES (?,?,?)', ['david', 42, 'baker']);
connection.commit()
connection.end() */
const prompt = promptSync();

const menu = () => {
    console.log('Welcome to CRM!');
    console.log('1.View employees');
    console.log('2.Create employee');
    console.log('3.Update employee');
    console.log('4.Delete employees');
    console.log('5.EXIT');
    const userInput = prompt('Enter your response: ');
    const input = parseInt(userInput);
    console.clear()
    return input;
}

console.log('Welcome to CRM!');
console.log('1.View employees');
console.log('2.Create employee');
console.log('3.Update employee');
console.log('4.Delete employees');
console.log('5.EXIT');
const userInput = prompt('Enter your response: ');
const input = parseInt(userInput);


const view = () => {
    connection.query('SELECT * FROM employees', function (err, result) {
        if (err) throw (err);
        console.log(result);
    })
    connection.commit();
}
const create = () => {
    const name = prompt('What is the employee name?');
    const age = prompt('What is the employees age? ');
    const position = prompt('What is the employees position?')
    connection.query('INSERT INTO employees (name, age, position) VALUES (?,?,?)', [name, parseInt(age), position], function (err, result) {
        if (err) console.log(err);
        console.log(result);
    })
    connection.commit();

}
const update = () => {
    const employeeId = prompt('Select the ID of the employee you want to update: ');
    const newName = prompt('What is the employees new name?');
    const newAge = prompt('What is the employees new age?');
    const newPosition = prompt('What is the employees new position?');
    connection.query('UPDATE employees SET name = ?, age = ?, position = ? WHERE id = ? ', [newName, parseInt(newAge), newPosition, parseInt(employeeId)], function (err, result) {
        if (err) console.log(err);
        console.log(result);
    })
    connection.commit();
}
const deleteEmp = () => {
    const employeeId = prompt('Select the ID of the employee you want to delete: ');
    connection.query('DELETE FROM employees WHERE id = ?', [employeeId], function (err, result) {
        if (err) console.log(err)
        console.log(result);
    })
}



while (true) {
    if (input === 1) view();
    if (input === 2) create();
    if (input === 3) update();
    if (input === 4) deleteEmp();
    if (input > 4) break
    
    break
}


connection.end();




