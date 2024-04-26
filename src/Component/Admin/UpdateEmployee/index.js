
import React, { Component } from 'react';
class UpdateEmployee extends Component {
  state = {
    name: '',
    position: '',
    id: ''
  };

  handleChangeUpdateName = (event) => {
    this.setState({ name: event.target.value });
  };

  handleChangeUpdatePosition = (event) => {
    this.setState({ position: event.target.value });
  };
  handleChangeUpdateId = (event) => {
    this.setState({ id: parseInt(event.target.value) });
  };
  
  onChange = (e) =>{
    this.setState(preveState => ({name: preveState.e.target.value, position: preveState.e.target.value, id: preveState.e.target.value}))
  }

  handleSubmitUpdate = async (event) => {
    event.preventDefault();
    const { name, position, id } = this.state;
    const employeeDetails = { name, position };
  
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employeeDetails)
    };
  
    try {
      const response = await fetch(`/employee/api/${id}`, options); // Corrected the URL string
      if (!response.ok) {
        throw new Error('Response put not ok');
      }
      this.setState({ name: '', position: '', id: '' });
    } catch (error) {
      console.error(error);
    }
  }
  
  render() {
    const { name, position, id } = this.state;

    return (
      <div className='container mb-5'>
        <h2>Update Employee</h2>
        <form onSubmit={this.handleSubmitUpdate}>
          <div className="form-group">
          <label htmlFor="id">ID:</label>
            <input
              type="number"
              className="form-control"
              id="id"
              name="id"
              value={id}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="id">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="position">Position:</label>
            <input
              type="text"
              className="form-control"
              id="position"
              name="position"
              value={position}
              onChange={this.onChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Update Employee</button>
        </form>
      </div>
    );
  }
}

export default UpdateEmployee