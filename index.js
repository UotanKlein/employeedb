import _ from 'lodash';

class EmployeeDB {
  constructor(name) {
    this.name = name;
    this.staff = {};
  }

  addEmployee(name, post, department) {
    const key = name.split(' ').join('-').toLowerCase();
    this.staff[key] = {name, post, department};
  }

  removeEmployee(name) {
    const key = name.split(' ').join('-').toLowerCase();
    delete this.staff[key];
  }

  updateEmployee(name, update) {
    const key = name.split(' ').join('-').toLowerCase();
    this.staff[key] = Object.assign(this.staff[key], update);
  }

  readStaff() {
    for (const [key, obj] of Object.entries(this.staff)) {
      console.log(`key: ${key}:\n`);
      for (const [keyIn, valueIn] of Object.entries(obj)) {
        console.log(`${keyIn}: ${valueIn}`);
      }
      console.log('-------------------------------');
    }
  }

  clone() {
    return _.cloneDeep(this);
  }

  uniqueDepartments() {
    const departments = new Set();
    Object.values(this.staff).forEach(employee => {
      departments.add(employee.department.toLowerCase());
    });
    console.log([...departments]);
  }

  static compareEmployees(employee1, employee2, fields) {
    for (const field of fields) {
      if (employee1[field] !== employee2[field]) {
        return false;
      }
    }
    return true;
  }

  mergeWith(otherDB) {
    Object.assign(this.staff, otherDB.staff);
  }
}
