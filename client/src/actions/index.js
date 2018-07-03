import axios from 'axios'
import { FETCH_USER } from './types'

export const fetchUser = () =>  async dispatch  => {
  const response =  await axios.get('/api/current_user')
  console.log(response)
  dispatch({type: FETCH_USER, payload: response.data ? response.data : false})
}   

export const handleToken = token => async dispatch => {
  console.log(token)
  const res = await axios.post('/api/stripe',token)
  dispatch({type: FETCH_USER, payload: res.data})
}