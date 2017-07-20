import React, { Component } from 'react'
import FormEdit from './FormEdit'

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: JSON.parse(localStorage.getItem('data')) || [],
      isGoing: false,
      mode: ''
    }
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const list = JSON.parse(localStorage.getItem('data')) || []

    for(const i in  list){
      if(list[i].id === Number(event.target.id) ){
          if(list[i].status === true){
            list[i].status = false
            this.setState({
              isGoing: false
            })
            localStorage.setItem('data', JSON.stringify(list))
          }else{
            this.setState({
              isGoing: true
            })
            list[i].status = true
            localStorage.setItem('data', JSON.stringify(list))
          } 
      } 
    }
  }
  onEdit(event) {
    let {edit} = this.props	
    const list = JSON.parse(localStorage.getItem('data')) || []

    for(const i in  list){
      if(list[i].id === Number(event.target.id) ){
        edit(list[i])
      }
    }
  }
  onDelete(event) {
   const list = JSON.parse(localStorage.getItem('data')) || []

    for(const i in  list){
      if(list[i].id === Number(event.target.id) ){
        list.splice(i,1)
        this.setState({
              todos: list
        })
        localStorage.setItem('data', JSON.stringify(list))
      }
    }
  }

  render() {
    const {todos} = this.state
    return (
      <div style={{ height: 300, background: '#f1efef', color: '#000' }}>
         { todos.map((data, index) => (
          <div key={data.id} style={{ padding: 3 }}>
            <div>
              { data.status ?
              <input
                name="isGoing"
                type="checkbox"
                checked={data.status}
                onChange={this.handleInputChange.bind(this)} 
                id={data.id}
              /> : <input
                name="isGoing"
                type="checkbox"
                checked={this.state.isGoing}
                onChange={this.handleInputChange.bind(this)} 
                id={data.id}
              /> }

              <span>
                { data.status ? <strike> { data.topic } </strike> : data.topic  }
              </span> 
              
              <button onClick={this.onEdit.bind(this)} id={data.id}>edit</button>
              <button onClick={this.onDelete.bind(this)} id={data.id}>delete</button>
              
            </div>
            <div>
              <span> -{ data.description }</span>
            </div>
          </div>
        ))}  
      </div>
    )
  }
}

export default List
