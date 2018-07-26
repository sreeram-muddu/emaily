import React from 'react'
import { connect } from 'react-redux'

import fieldData from './formFields'

import { withRouter } from 'react-router-dom'

import * as actions from '../../actions'

const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {

    const reviewFields = fieldData.map(({name,label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        )
    })
    return (
        <div>
            <h5>please confirm your entries </h5>
             {reviewFields}
            <button
              className="yellow darken-3 white-text btn-flat"
              onClick={onCancel}
            >
            Back
                </button>

            <button
              onClick={() => submitSurvey(formValues, history) }
              className="green white-text btn-flat right"
            >
            Send Survey <i className="material-icons right">email</i>
                </button>
         </div>
    )
}

function mapStateToProps(state) {
    return{ formValues: state.form.surveyForm.values}
}

export default  connect(mapStateToProps, actions)(withRouter(SurveyFormReview))