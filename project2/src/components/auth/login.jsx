import React, { Component } from 'react'
import { Col, Row, Button, Card, Container, CardHeader, CardBody, FormGroup, Label } from 'reactstrap'
import { Field, Form as FormikForm, Formik } from 'formik'
import { loginSchema } from '../../validation-schemas/validation-schemas'
import { connect } from 'react-redux'
import { loginUser } from '../../redux/auth/actions'
import { NavLink } from 'react-router-dom'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: 'admin@demo.com',
      password: 'admin@123'
    }
  }

  onUserLogin = values => {
    if (!this.props.loading) {
      if (values.email && values.password) {
        this.props.loginUser(values, this.props.history)
      }
    }
  }

  componentDidUpdate () {
    if (this.props.error) {
      console.log(this.props.error)
    }
  }

  render () {
    const { password, email } = this.state
    const initialValues = { email, password }

    return (
      <div className="content">
        <Container fluid>
          <Row>
            <Col md={12} className="min-vh-100 d-flex flex-column justify-content-center">
              <Row>
                <Col lg={6} md={8} className="mx-auto">
                  <Card className="rounded shadow shadow-sm">
                    <CardHeader>
                      <h3 className="mb-0">Login</h3>
                    </CardHeader>
                    <CardBody>
                      {this.props.error && <div className="d-block invalid-feedback">{this.props.error.message}</div>}
                      <Formik initialValues={initialValues}
                              validationSchema={loginSchema}
                              onSubmit={this.onUserLogin}>
                        {({ errors, touched }) => (
                          <FormikForm>
                            <FormGroup>
                              <Label>
                                Email
                              </Label>
                              <Field className="form-control form-control-lg rounded-0"
                                     name="email"/>
                              {errors.email && touched.email && (
                                <div
                                  className="d-block invalid-feedback">{errors.email}</div>)}
                            </FormGroup>
                            <FormGroup className="form-group">
                              <Label>
                                Password
                              </Label>
                              <Field type="password" className="form-control form-control-lg rounded-0"
                                     name="password"/>
                              {errors.password && touched.password && (
                                <div
                                  className="d-block invalid-feedback">{errors.password}</div>)}
                            </FormGroup>
                            <div
                              className="d-flex justify-content-between align-items-center">
                              <NavLink to="#">
                                Forgot password?
                              </NavLink>
                              <Button color="success" variant="success" size="lg"
                                      type="submit"
                                      className={`float-right btn-fill ${this.props.loading ? 'disabled' : ''}`}>
                                Login
                              </Button>
                            </div>
                          </FormikForm>
                        )}
                      </Formik>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = ({ authUser }) => {
  const { user, loading, error } = authUser
  return { user, loading, error }
}

const mapActionsToProps = { loginUser }

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Login)
