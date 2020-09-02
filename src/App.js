import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  state = {
    pizzas: [],
    id: 0,
    topping: "",
    size: "",
    vegetarian: null
  }

  componentDidMount() {
    fetch("http://localhost:3000/pizzas")
    .then(res => res.json())
    .then(pizzaArr => {
        this.setState({
          pizzas: pizzaArr
      })
    })
  }

 


  handleEdit =(evt)=> {
    console.log(evt)
    this.setState({
      id: evt.id,
      topping: evt.topping,
      size: evt.size,
      vegetarian: evt.vegetarian
    })
  }

  handleChange= (evt) => {
    this.setState({
       [evt.target.id]: evt.target.value
    })
  }

//This will update Dom but not persist on backend yet///need to repair
handleSubmit = (evt) => {
  let pizza = this.state.pizzas.filter(pizza => pizza.id === this.state.id ) 
    pizza.map(pizza => {
      return (
        pizza.topping = this.state.topping,
        pizza.size = this.state.size,
        pizza.vegetarian = this.state.vegetarian 
      )
    }  
  )

 let newArr =  this.state.pizzas.filter(pizza => pizza.id !== this.state.id )
  let updateArr = [pizza[0], ...newArr]

  this.setState({
    pizzas: updateArr
  })
}


  render() {
    console.log(this.state)
    return (
      <Fragment>
        <Header/>

        <PizzaForm 
            topping={this.state.topping} 
            size={this.state.size} 
            vegetarian = {this.state.vegetarian} 
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
        />

        <PizzaList pizzas = {this.state.pizzas} handleEdit={this.handleEdit}/>
      </Fragment>
    );
  }
}

export default App;
