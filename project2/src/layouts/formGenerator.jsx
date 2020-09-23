import React, { Component } from 'react'
import { Button, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label } from 'reactstrap'
import { Field, Formik, Form } from 'formik'
import CustomSelect from './customSelect'

class FormGenerator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isDiscountOpen: false
    }
  }

  getTextField (field, errors, touched, index) {
    return (
      <FormGroup key={index}>
        <Label>
          {field.label}
        </Label>
        <Field className="form-control form-control-lg rounded-0"
               name={field.name}/>
        {errors[field.name] && touched[field.name] && (
          <div
            className="d-block invalid-feedback">{errors[field.name]}</div>)}
      </FormGroup>
    )
  }

  getRadioField (radio, errors, touched, index) {
    return (
      <FormGroup check inline key={index}>
        <Label>
          {radio.label}
        </Label>
        <Field className="form-control form-control-lg rounded-0"
               name={radio.name}>
          {({ field: { value }, form: { setFieldValue } }) => {
            return radio.options.map(option => {
              return (
                <Label check key={option.label}>
                  <Input
                    type='radio'
                    name={radio.name}
                    onChange={() => setFieldValue(radio.name, option.value)}
                    value={option.value}
                    checked={option.value === value}
                  /> {option.label}
                </Label>
              )
            })
          }
          }
        </Field>

        {errors[radio.name] && touched[radio.name] && (
          <div
            className="d-block invalid-feedback">{errors[radio.name]}</div>)}
      </FormGroup>
    )
  }

  getTextareaField (field, errors, touched, index) {
    return (
      <FormGroup key={index}>
        <Label>
          {field.label}
        </Label>
        <Field component="textarea"
               rows="2" className="form-control form-control-lg rounded-0"
               name={field.name}/>
        {errors[field.name] && touched[field.name] && (
          <div
            className="d-block invalid-feedback">{errors[field.name]}</div>)}
      </FormGroup>
    )
  }

  getCustomField (field, errors, touched, type, index) {
    return (
      <FormGroup key={index}>
        <Label>
          {field.label}
        </Label>
          <Field type={type} className={`form-control ${type !== 'date' ? 'form-control-lg' : ''} rounded-0`}
                 name={field.name}/>
        {errors[field.name] && touched[field.name] && (
          <div
            className="d-block invalid-feedback">{errors[field.name]}</div>)}
      </FormGroup>
    )
  }

  getSelectField (selectField, errors, touched, index) {
    let selectType = selectField.selectType || 'searchable'
    return (
      <FormGroup key={index}>
        <Label>
          {selectField.label}
        </Label>
        <Field className="form-control form-control-lg rounded-0"
               name={selectField.name}>
          {({ field: { value = selectField.value }, form: { setFieldValue, values } }) => {
            return (
              <CustomSelect
                options={selectField.options}
                multiple={selectType === 'multiple'}
                searchable={selectType === 'searchable'}
                creatable={selectType === 'creatable'}
                name={selectField.name}
                value={selectField.options.find(item => item.value === value)}
                onCreateEvent={(value) => selectField.createEvent(value, values)}
                changeEvent={(name, selectedValue) => {
                  setFieldValue(name, selectedValue.value);
                if(selectField.hasOwnProperty('changeEvent')){
                    selectField.changeEvent({...values, [selectField.name] : selectedValue.value})
                }
                }}
              />
            )
          }}
        </Field>
        {errors[selectField.name] && touched[selectField.name] && (
          <div
            className="d-block invalid-feedback">{errors[selectField.name]}</div>)}
      </FormGroup>
    )
  }

  getCurrencyField (field, errors, touched, index) {
    return (
      <FormGroup key={index}>
        <Label>
          {field.label}
        </Label>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>$</InputGroupText>
          </InputGroupAddon>
          <Field type="number" step={0.01} className="form-control form-control-lg rounded-0"
                 name={field.name}/>
          {errors[field.name] && touched[field.name] && (
            <div
              className="d-block invalid-feedback">{errors[field.name]}</div>)}
        </InputGroup>
      </FormGroup>
    )
  }

  getDiscountField (field, errors, touched, index) {
    return (
      <FormGroup key={index}>
        <Label>
          {field.label}
        </Label>
        <InputGroup>
          <InputGroupAddon addonType="prepend" style={{ width: '10%' }}>
            <Field className="form-control form-control-lg rounded-0"
                   name={field.name + 'Type'}>
              {({ field: { value }, form: { setFieldValue } }) => {
                let newvalue = value ? value : field.optionValue
                return (
                  <CustomSelect
                    placeHolder=''
                    options={field.options}
                    multiple={field.selectType === 'multiple'}
                    searchable={field.selectType === 'searchable'}
                    creatable={field.selectType === 'creatable'}
                    name={field.name + 'Type'}
                    value={field.options.find(item => {return item.value === newvalue})}
                    changeEvent={(name, selectedValue) => {
                      setFieldValue(name, selectedValue.value)
                    }}
                  />
                )
              }}
            </Field>
          </InputGroupAddon>
          <Field type="number" step={0.01} className="form-control form-control-lg rounded-0"
                 name={field.name}/>
          {errors[field.name] && touched[field.name] && (
            <div
              className="d-block invalid-feedback">{errors[field.name]}</div>)}
        </InputGroup>
      </FormGroup>
    )
  }

  submitForm () {
    this.buttonRef.click()
  }

  render () {
    return (
      <Formik initialValues={this.props.initialValues}
              enableReinitialize
              validationSchema={this.props.validationSchema}
              onSubmit={this.props.onSubmit}>
        {({ errors, touched }) => {
              console.log('errors : ', errors)
          return (
            <Form>
              {
                this.props.fields.map((field, index) => {
                  if (field.type === 'checkbox' || field.type === 'number' || field.type === 'date' || field.type === 'password') {
                    return this.getCustomField(field, errors, touched, field.type, index)
                  }
                  if (field.type === 'textarea') {
                    return this.getTextareaField(field, errors, touched, index)
                  }
                  if (field.type === 'radio') {
                    return this.getRadioField(field, errors, touched, index)
                  }
                  if (field.type === 'currency') {
                    return this.getCurrencyField(field, errors, touched, index)
                  }
                  if (field.type === 'select') {
                    return this.getSelectField(field, errors, touched, index)
                  }
                  if (field.type === 'discount') {
                    return this.getDiscountField(field, errors, touched, index)
                  }
                  return this.getTextField(field, errors, touched, index)
                })
              }
              {(!this.props.hasOwnProperty('showSubmit') || this.props.showSubmit) && <div
                className="d-flex justify-content-between align-items-center">
                <Button color="success" variant="success" size="lg" innerRef={ref => this.buttonRef = ref}
                        type="submit"
                        className={`float-right btn-fill ${this.props.loading ? 'disabled' : ''}`}>
                  Save
                </Button>
              </div>}
            </Form>
          )
        }}
      </Formik>
    )
  }
}

export default FormGenerator
