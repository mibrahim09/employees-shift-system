import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Col, Row } from 'react-bootstrap'
import config from '../../config.json'
import axios from 'axios'
class Home extends Component {
  apiEndPoint = config.apiEndPoint + 'shifts'

  state = {
    data: [],
    sunday: new Date(),
    date_offset: 0,
  }
  getSundayDate() {
    var curr = new Date() // get current date
    var first = curr.getDate() - curr.getDay() // First day is the day of the month - the day of the week
    var last = first + 6 // last day is the first day + 6

    var firstday = new Date(curr.setDate(first)) // get the sunday.
    return firstday
    // var lastday = new Date(curr.setDate(last)).toUTCString()
  }
  handleEdit(shiftId) {
    const p = this.getSundayDate()
  }
  async handleDelete(shiftId) {
    try {
      const result = await axios.delete(`${this.apiEndPoint}/${shiftId}`)
      if (result.status == 200) {
        const data = [...this.state.data]
        const newResult = data.map((p) => {
          p.employeeShifts = p.employeeShifts.filter(
            (e) => e.shiftId != shiftId,
          )
          return p
        })
        this.setState({ data: newResult })
      }
    } catch (ex) {}
  }
  setNewWeek(offset) {
    const { sunday, date_offset } = this.state
    const newDate_offset = date_offset + offset
    const newSunday = this.addDays(sunday, offset)

    this.setState({
      sunday: newSunday,
      date_offset: newDate_offset,
    })
  }

  addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)
  }
  validateDate(date) {
    const d1 = new Date(date) // my date
    const d2 = this.addDays(this.state.sunday, 6) // weekend
    const sunday = this.state.sunday // weekstart
    return d1 < d2 && d1 > sunday
  }
  async componentDidMount() {
    try {
      //
      const sunday = this.getSundayDate()

      const result = await axios.get(this.apiEndPoint)
      if (result.status == 200) {
        const data = result.data
        this.setState({
          data,
          date_offset: 0,
          sunday: sunday,
        })
      }
    } catch (ex) {}
  }
  getHeader(p, day) {
    const { sunday } = this.state

    const schedule = p.employeeShifts.filter(
      (e) => e.dayOfWeek == day && this.validateDate(e.date),
    )
    return schedule.map((s) => (
      <div>
        <span>
          {s.startTime} to {s.endTime}
        </span>
        <br />
        {s.isEditable && (
          <div>
            <Link
              className="btn btn-primary btn-xs m-1"
              to={{
                pathname: '/shifts/' + s.shiftId,
                state: {
                  shift: s,
                },
              }}
            >
              E
            </Link>
            <button
              className="btn btn-danger btn-xs"
              onClick={() => this.handleDelete(s.shiftId)}
            >
              X
            </button>
          </div>
        )}
      </div>
    ))
  }
  findThisWeek(shifts) {
    var found = false
    shifts.forEach((x, i) => {
      if (this.validateDate(x.date)) {
        found = true
      }
    })
    return found
  }
  render() {
    const { sunday, date_offset } = this.state
    const end_day = this.addDays(sunday, 7)
    const data = [...this.state.data]
    const empToShow = data.sort((a, b) => {
      if (a.employeeName > b.employeeName) return 1
      return -1
    })
    return (
      <Container>
        {end_day && (
          <h3 className="text-center">
            Viewing results from {sunday.toUTCString()} to{' '}
            {end_day.toUTCString()}
          </h3>
        )}
        <div className="text-center">
          <button
            className="btn btn-warning btn-lg m-3"
            onClick={() => {
              this.setNewWeek(-7)
            }}
          >
            Previous Week
          </button>
          <button
            className="btn btn-success btn-lg m-3"
            onClick={() => {
              this.setNewWeek(7)
            }}
          >
            Next Week
          </button>
        </div>
        <Container className="border fw-light text-center">
          <Row className="border-bottom mb-1">
            <Col xs={2}>Name</Col>
            <Col xs={2}>Sunday</Col>
            <Col xs={2}>Monday</Col>
            <Col xs={2}>Tuesday</Col>
            <Col xs={2}>Wednesday</Col>
            <Col xs={2}>Thursday</Col>
          </Row>
          {empToShow
            .filter(
              (e) =>
                e.employeeShifts.length != 0 &&
                this.findThisWeek(e.employeeShifts),
            )
            .map((emp) => (
              <Container className="border-bottom">
                <Row className="mb-3">
                  <Col xs={2}>{emp.employeeName}</Col>
                  <Col xs={2}>{this.getHeader(emp, 'Sunday')}</Col>
                  <Col xs={2}>{this.getHeader(emp, 'Monday')}</Col>
                  <Col xs={2}>{this.getHeader(emp, 'Tuesday')}</Col>
                  <Col xs={2}>{this.getHeader(emp, 'Wednesday')}</Col>
                  <Col xs={2}>{this.getHeader(emp, 'Thursday')}</Col>
                </Row>
              </Container>
            ))}
        </Container>
      </Container>
    )
  }
}

export default Home
