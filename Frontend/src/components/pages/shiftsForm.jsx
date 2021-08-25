import React, { Component } from 'react'
import Form from '../common/form'
import Joi from 'joi'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import config from '../../config.json'

class ShiftsForm extends Form {
  state = {
    data: {
      employeeId: 0,
      date: '',
      startTime: '',
      endTime: '',
    },
    shiftId: -1,
    errors: [],
    globalError: '',
    globalOK: '',
  }

  apiEndPoint = config.apiEndPoint + 'shifts'

  schema = Joi.object({
    employeeId: Joi.number().required(),
    date: Joi.string().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
  })
  componentDidMount() {
    try {
      const result = this.props.shift.state.shift
      const dataClone = {
        employeeId: result.employeeId + '',
        date: result.date,
        startTime: result.startTime,
        endTime: result.endTime,
      }
      if (result)
        this.setState({
          data: dataClone,
          shiftId: result.shiftId,
          errors: [],
        })
    } catch {}
  }
  async doSubmit() {
    const { name } = this.state.data
    const { shiftId } = this.state
    try {
      var realApiEndPoint = this.apiEndPoint
      if (shiftId != -1)
        realApiEndPoint = config.apiEndPoint + 'shifts/edit/' + shiftId
        
      const result = await axios.post(realApiEndPoint, this.state.data)
      if (result.status == 200) {
        this.setState({
          globalOK: `You have successfully added this shift!`,
          globalError: '',
        })
      }
    } catch (ex) {
      console.log(ex.response)
      this.setState({ globalError: ex.response.data, globalOK: '' })
    }
  }

  render() {
    const { globalError, globalOK } = this.state

    return (
      <Container>
        <h3 className="mb-5">Register</h3>
        {this.renderInput('employeeId', 'Employee Id')}
        {this.renderInput('date', 'Date', 'text', 'yyyy-mm-dd')}
        {this.renderInput('startTime', 'Start Time', 'text', 'hh:mm')}
        {this.renderInput('endTime', 'Finish Time', 'text', 'hh:mm')}
        {this.renderBtn('Save')}
        {globalError && (
          <div className="mt-3 alert alert-danger">{globalError}</div>
        )}
        {globalOK && <div className="mt-3 alert alert-success">{globalOK}</div>}
      </Container>
    )
  }
}

export default ShiftsForm
