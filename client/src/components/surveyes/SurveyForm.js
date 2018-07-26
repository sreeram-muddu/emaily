import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import {Link} from 'react-router-dom'
import SurveyField from './SurveyField'
import _ from 'lodash'
import validateEmails from '../../utils/validateEmails'

import fieldData from './formFields'


class SurveyForm extends Component {

    renderFileds() {
      return (
          <div>
              {fieldData.map((data,i) => 
                  <Field
                    key={i}
                    type="text" 
                    component={SurveyField}
                    {...data}

                  />
              )}
           </div>
      )
    }
    render() {
        return (
            <div>
                <form 
                onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
                >
                {this.renderFileds()}
                <Link to ="/surveys" className="red btn-flat white-text">
                  Cancel
                </Link>
                <button type="submit" className="teal btn-flat right white-text">Next
                <i className="material-icons right">done</i>
                </button>
                 </form>
            </div>
        )
    }


}

function validate(values) {
    const errors = {}
    errors.recipients = validateEmails(values.recipients  || '')

  _.each(fieldData, ({name})=> {
      if( !values[name]) {
          errors[name]= 'you must provide a value'
      }
  })


  return errors
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm)