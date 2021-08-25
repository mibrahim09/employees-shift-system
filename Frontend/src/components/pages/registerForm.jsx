import React, { Component } from 'react'
import Form from '../common/form'
import Joi from 'joi'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import config from '../../config.json'

class RegisterForm extends Form {
  state = {
    data: {
      name: '',
    },
    errors: [],
    globalError: '',
    globalOK: '',
  }

  apiEndPoint = config.apiEndPoint + 'employees'

  schema = Joi.object({
    name: Joi.string().required().max(20).min(4).label('Employee Name'),
  })

  async doSubmit() {
    const { name } = this.state.data
    try {
      const result = await axios.post(this.apiEndPoint, this.state.data)
      console.log(result)
      if (result.status == 200) {
        this.setState({
          globalOK: `You have successfully registered!`,
          globalError: '',
        })
      }
    } catch (ex) {
      this.setState({ globalError: ex.response.data.error, globalOK: '' })
    }
  }

  render() {
    const { globalError, globalOK } = this.state
    return (
      <Container>
        <h3 className="mb-5">Register</h3>
        {this.renderInput('name', 'Employee Name')}
        {this.renderBtn('Register new Employee')}
        {globalError && (
          <div className="mt-3 alert alert-danger">{globalError}</div>
        )}
        {globalOK && <div className="mt-3 alert alert-success">{globalOK}</div>}
      </Container>
    )
  }
}

export default RegisterForm
