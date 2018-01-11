import React, { Component } from 'react';
import './App.css';
import TimeSpan from './components/TimeSpan/TimeSpan';
import WeekHeader from './components/WeekHeader/WeekHeader';
import MonthHeader from './components/MonthHeader/MonthHeader';

let displayMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTimeSpan: "week",
      plans: {
        "requests": [
          {
            "start_date": "2017-12-19",
            "end_date": "2018-01-01",
            "plan_id": "1",
            "planned_hours": "80",
            "user": "Arun"
          },
          {
            "start_date": "2018-01-01",
            "end_date": "2018-01-12",
            "plan_id": "2",
            "planned_hours": "40",
            "user": "Nitin"
          }
        ],
        "allocations": [
          {
            "hours": "8",
            "request_date": "2017-12-19",
            "plan_id": "1"
          },
          {
            "hours": "8",
            "request_date": "2017-12-20",
            "plan_id": "1"
          },
          {
            "hours": "8",
            "request_date": "2017-12-21",
            "plan_id": "1"
          },
          {
            "hours": "8",
            "request_date": "2017-12-22",
            "plan_id": "1"
          },
          {
            "hours": "8",
            "request_date": "2017-12-25",
            "plan_id": "1"
          },
          {
            "hours": "8",
            "request_date": "2017-12-26",
            "plan_id": "1"
          },
          {
            "hours": "8",
            "request_date": "2017-12-27",
            "plan_id": "1"
          },
          {
            "hours": "8",
            "request_date": "2017-12-28",
            "plan_id": "1"
          },
          {
            "hours": "8",
            "request_date": "2017-12-29",
            "plan_id": "1"
          },
          {
            "hours": "8",
            "request_date": "2018-01-01",
            "plan_id": "1"
          },
          {
            "hours": "4",
            "request_date": "2018-01-01",
            "plan_id": "2"
          },
          {
            "hours": "4",
            "request_date": "2018-01-02",
            "plan_id": "2"
          },
          {
            "hours": "4",
            "request_date": "2018-01-03",
            "plan_id": "2"
          },
          {
            "hours": "4",
            "request_date": "2018-01-04",
            "plan_id": "2"
          },
          {
            "hours": "4",
            "request_date": "2018-01-05",
            "plan_id": "2"
          },
          {
            "hours": "4",
            "request_date": "2018-01-08",
            "plan_id": "2"
          },
          {
            "hours": "4",
            "request_date": "2018-01-09",
            "plan_id": "2"
          },
          {
            "hours": "4",
            "request_date": "2018-01-10",
            "plan_id": "2"
          },
          {
            "hours": "4",
            "request_date": "2018-01-11",
            "plan_id": "2"
          },
          {
            "hours": "4",
            "request_date": "2018-01-12",
            "plan_id": "2"
          }
        ]
      }
    }
    this.onTimeSpanChange = this.onTimeSpanChange.bind(this);
  }

  onTimeSpanChange(e) {
    this.setState({ selectedTimeSpan: e.target.value });
  }

  getMonday(dateString) {
    let reqDate = new Date(dateString);
    let day = reqDate.getDay();
    if (day !== 1) {
      reqDate.setHours(-24 * (day - 1));
    }
    return reqDate;
  }

  appendLeadingZero(data) {
    if (data < 10) {
      return `0${data}`;
    } else {
      return data;
    }
  }

  convertDateToString(dateToBeConverted) {
    return `${dateToBeConverted.getFullYear()}-${this.appendLeadingZero(dateToBeConverted.getMonth() + 1)}-${this.appendLeadingZero(dateToBeConverted.getDate())}`;
  }

  getMonth(dateString) {
    let reqDate = new Date(dateString);
    return displayMonths[reqDate.getMonth()];
  }


  render() {
    let users = [];
    this.state.plans.requests.map((request) => {
      if (users.indexOf(request.plan_id) === -1) {
        users = [...users, request];
      }
    });
    let allocationForUsers = users.map(user => {
      return this.state.plans.allocations.filter(allocation => allocation.plan_id === user.plan_id)
    });
    let weeks = allocationForUsers.map(allocationForUser => {
      return allocationForUser.map(allocation => {
        return this.convertDateToString(this.getMonday(allocation.request_date));
      });
    }).reduce((a, b) => [...a, ...b]);
    let uniqueWeeks = [...new Set(weeks.map(week => week))];
    let flattenedAllocationForUsers = allocationForUsers.reduce((a, b) => [...a, ...b]);
    let weeklyHours = uniqueWeeks.map(week => {
      return users.map(user => {
        return flattenedAllocationForUsers.map(allocation => {
          if (allocation.plan_id === user.plan_id && this.convertDateToString(this.getMonday(allocation.request_date)) === week) {
            return {
              user: user.user,
              hours: allocation.hours,
              plan_id: user.plan_id
            };
          }
          else {
            return {
              user: user.user,
              hours: 0,
              plan_id: user.plan_id
            };
          }
        });
      });
    }).map(week => week.map(userWeek => userWeek.reduce((a, b) => a + +b.hours, 0)
    ));

    let months = allocationForUsers.map(allocationForUser => {
      return allocationForUser.map(allocation => {
        return this.getMonth(allocation.request_date);
      });
    }).reduce((a, b) => [...a, ...b]);
    let uniqueMonths = [...new Set(months.map(month => month))];
    let monthlyHours = uniqueMonths.map(month => {
      return users.map(user => {
        return flattenedAllocationForUsers.map(allocation => {
          if (allocation.plan_id === user.plan_id && this.getMonth(allocation.request_date) === month) {
            return {
              user: user.user,
              hours: allocation.hours,
              plan_id: user.plan_id
            };
          }
          else {
            return {
              user: user.user,
              hours: 0,
              plan_id: user.plan_id
            };
          }
        });
      });
    }).map(month => month.map(userMonth => userMonth.reduce((a, b) => a + +b.hours, 0)
    ));
    let hours = [];
    if (this.state.selectedTimeSpan === "week") {
      hours = weeklyHours;
    }
    else {
      hours = monthlyHours;
    }
    let userNames = users.map((user, index) => <tr key={index}><td>{user.user}</td><td>{this.state.plans.requests[index].planned_hours}</td>{hours.map(hour => <td>{hour[index]}</td>)}</tr>);
    return (
      <div className="App">
        <TimeSpan selectedTimeSpan={this.state.selectedTimeSpan} onTimeSpanChange={this.onTimeSpanChange}></TimeSpan>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Hours</th>
              {this.state.selectedTimeSpan === "week" && <WeekHeader weeks={uniqueWeeks} />}
              {this.state.selectedTimeSpan === "month" && <MonthHeader months={uniqueMonths} />}
            </tr>
          </thead>
          <tbody>
            {userNames}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
