import React, { Component } from 'react'
import List from './List'
import Sort from './Sort'
class Container extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			date: '',
			topic: '',
			description: '',
			todos: JSON.parse(localStorage.getItem('todos')) || [],
			statusEdit: false,
		}
	}
	changeTopic(value) {
		this.setState({
			topic: value.target.value
		})
	}
	changeDescription(value) {
		this.setState({
			description: value.target.value
		})
	}
	changeDate(value) {
		this.setState({
			date: value.target.value
		})
	}
	addTodo = (value) => {
		value.preventDefault()
    const data = {
     	id: Date.now(),
			topic: this.state.topic,
			description: this.state.description,
			date: this.state.date,
			status: false
    }
    this.setState((prevState) => ({
      todos: prevState.todos.concat(data),
			topic: '',
			description: ''
		}))
		localStorage.setItem('data', JSON.stringify(this.state.todos))
		console.log('addTodo',value)
	}
	onEdit(value) {
		this.setState({
			statusEdit: true,
			id: value.id,
			date: value.date,
			topic: value.topic,
			description: value.description,
		}) 
	}
	editTodo = (value) => {
		const list = JSON.parse(localStorage.getItem('data')) || []
		for(const i in  list){
      if( list[i].id === this.state.id ){
				list[i].date = this.state.date
				list[i].topic = this.state.topic
				list[i].description = this.state.description
				localStorage.setItem('data', JSON.stringify(list))
			}
		}
		console.log(list)
		this.setState({ 
			statusEdit: false,
			id: '',
			date: '',
			topic: '',
			description: '', 
		})
	}
	 
  render() {
    return (
      <div style={{ width: 300, background: '#333', padding: 10 }}>
				<Sort />
        <List todos={this.state.todos} edit={this.onEdit.bind(this)}/>
        <div style={{ marginTop: 10 }}>
				{this.state.statusEdit? 
						<div>	
							  <label style={{ color: '#fff' }}>Edit </label>
								<div>	
									<label style={{ color: '#fff' }}>Topic </label>
									<input type='text'
										onChange={this.changeTopic.bind(this)}
										value={this.state.topic}
									/>
								</div>
								<div>
									<label style={{ color: '#fff' }}>Description </label>
									<input type='text' 
										onChange={this.changeDescription.bind(this)}
										value={this.state.description}
									/>
								</div>
								<div>
									<label style={{ color: '#fff' }}>Date </label>
									<input type='date'
										onChange={this.changeDate.bind(this)}
										value={this.state.date}
									/>
								</div>
								<button onClick={this.editTodo} >Submit</button>
					  </div>
				:
				<div>
					<label style={{ color: '#fff' }}>Add Todo </label>
						<form onSubmit={this.addTodo}>
							<div>
								<label style={{ color: '#fff' }}>Topic </label>
								<input type='text'
									onChange={this.changeTopic.bind(this)}
									value={this.state.topic}
								/>
							</div>
							<div>
								<label style={{ color: '#fff' }}>Description </label>
								<input type='text' 
									onChange={this.changeDescription.bind(this)}
									value={this.state.description}
								/>
							</div>
							<div>
								<label style={{ color: '#fff' }}>Date </label>
								<input type='date'
									onChange={this.changeDate.bind(this)}
									value={this.state.date}
								/>
							</div>
							<button type='submit'>Submit</button>
						</form>
				</div>
			      
				}
	    </div>
      </div>
    )
  }
}

export default Container
