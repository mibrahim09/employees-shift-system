import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import config from '../../config.json'
class Employees extends Component {
  state = {
    employees: [],
  }
  apiEndPoint = config.apiEndPoint + 'employees'
  async componentDidMount() {
    try {
      const result = await axios.get(this.apiEndPoint)
      if (result.status == 200) {
        const data = result.data
        this.setState({
          employees: data,
        })
      }
    } catch (ex) {}
  }
  render() {
    const employees = [...this.state.employees]
    const sorted = employees.sort((a, b) => {
      if (a.name > b.name) return 1
      return -1
    })
    return (
      <Container>
        <table className="table">
          <thead className="border-bottom mb-3">
            <td>Employee Name</td>
            <td></td>
          </thead>
          {employees.map((e) => (
            <tr className="mb-3">
              <td>{e.name}</td>
              <td>
                <Link
                  className="btn btn-warning"
                  to={{
                    pathname: '/shifts/new/' + e.id,
                    state: {
                      employee: e.name,
                    },
                  }}
                >
                  Add Shift
                </Link>
              </td>
            </tr>
          ))}
          <tr></tr>
        </table>
      </Container>
    )
  }
}

export default Employees
