import { Component } from "react"
import { Navigate } from "react-router-dom"
class SignUp extends Component {
    state = {
      username: '',
      password: '',
      showSubmitError: false,
      errorMsg: '',
      showLoginpage: false
    }
    onChangeUsername = event => {
      this.setState({ username: event.target.value })
    }
  
    onChangePassword = event => {
      this.setState({ password: event.target.value })
    }
    onChangeAddress = event => {
      this.setState({ address: event.target.value })
    }
  
    submitForm = async (event) => {
      event.preventDefault()
      const { username, password } = this.state
  
      if (username === '' || password === '') {
        this.setState({ showSubmitError: true })
        this.setState({ errorMsg: 'fild the valid value' })
        
      }
      else if (username !== '' && password !== '') {
        const  userDetails = {username, password}
        const url = '/singup'
        const options = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userDetails),
      }
     const response = await fetch(url, options)
    
    if (response.ok === true) {
      this.setState({showLoginpage: true})
    } 
    else {
    const message = await response.json()
    this.setState({showSubmitError: true, errorMsg: message})
    }
      }
      this.setState({username: "", password: "", address: ""})
  
    }
  
    render() {
      const { username, password, errorMsg, showSubmitError, showLoginpage } = this.state
      if(showLoginpage === true){
        return <Navigate to='/' true/>
      }
      return (
        <div className="container d-flex justify-content-center flex-column">
          <form onSubmit={this.submitForm} className='container'>
            <legend>Sign up</legend>
            <div className="mb-3" style={{width: `500px`}}>
              <label htmlFor="UserName" className="form-label">UserName</label>
              <input type="text" id="UserName" className="form-control" placeholder="UserName" onChange={this.onChangeUsername} value={username}  />
            </div>
            <div className="mb-3" style={{width: `500px`}}>
              <label className="form-label" htmlFor="password">
                password
              </label>
              <input className="form-control" type="password" id="password" placeholder="password" onChange={this.onChangePassword} value={password} />
            </div>
            <button type="submit" className="btn btn-primary" >Sing in</button>
            {showSubmitError ? <p style={{color: 'red'}}>{errorMsg}</p> : null}
          </form>
        </div> 
      )
    }
  }
  export default SignUp