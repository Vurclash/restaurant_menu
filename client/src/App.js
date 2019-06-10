import React from 'react';
import axios from 'axios'; 
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Container, Header, } from 'semantic-ui-react';

class App extends React.Component {
  state = { todos: [], };

  componentDidMount() {
      // TODO make a call to our rails server to get Items
    axios.get("/api/items")
      .then( res => {
        this.setState({ todos: res.data, });
      })
      .catch( err => {
        // console.log(err)
      })
  };

  addItem = (name) => {
    // TODO make api call to railos server to add an item
    axios.post("/api/items", { name, })
    .then( res => {
      this.setState({ todos: [...this.state.todos, res.data], });
    });
    // TODO add new todo to state
  };

  updateTodo = (id) => {
    // TODO make api call to rails server to update todo
    axios.put(`/api/items/${id}`)
    .then( res => {
      const todos = this.state.todos.map ( t=> {
        if (t.id === id)
          return res.data;
        return t;
      });
      this.setState({ todos, });
    })
    // TODO update state
  };

  deleteTodo = (id) => {
    // TODO make api call to rails server to delete todo
    axios.delete(`api/items/${id}`)
    .then( res => {
      const { todos, } = this.state;
      this.setState({ todos: todos.filter(t => t.id !== id), })
     });
    
    // TODO remove todo from state
  };

  render() {
    return (
      <Container styel={{ padeding: "30px 0px", }}>
        <Header as="h1">Rails/React Todo List</Header>
        <br />
        <TodoForm addItem={this.addItem} />
        <br />
        <br />
        <TodoList
          todos={this.state.todos}
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo}
        />
      </Container>
    );
  };
};

export default App;
