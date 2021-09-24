/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function (employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function (employees) {
    return employees.map(createEmployeeRecord)
}

let createTimeInEvent = function (timeStamp) {
    let [date, hour] = timeStamp.split(' ')
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date
    })
    return this;
}

let createTimeOutEvent = function (timeStamp) {
    let [date, hour] = timeStamp.split(" ");
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
    });
  
    return this;
  };

let hoursWorkedOnDate = function (date) {
    let inHour = this.timeInEvents.find((e) => e.date === date).hour;
    let outHour = this.timeOutEvents.find((e) => e.date === date).hour;

    return (outHour - inHour) / 100;
};

let wagesEarnedOnDate = function (date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
};
  
let findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find((employee) => employee.firstName === firstName);
};
  
let calculatePayroll = function (recordsArray) {
    return recordsArray.reduce((acc, currEmployee) => acc + allWagesFor.call(currEmployee),0)
}