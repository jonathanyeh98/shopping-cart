import React, {Component} from 'react'
import logo from './logo.svg';
import './App.css';

const CartFooter = ({copyright}) =>{
  return(
  <a className="navbar-brand" href="#">&copy;{copyright}</a>
  )
}


const carItemsList = [
  { id: 1, product: { id: 40, name: 'Mediocre Iron Watch', priceInCents: 399 }, quantity: 1 },
  { id: 2, product: { id: 41, name: 'Heavy Duty Concrete Plate', priceInCents: 499 }, quantity: 2 },
  { id: 3, product: { id: 42, name: 'Intelligent Paper Knife', priceInCents: 1999 }, quantity: 1 },
]


class App extends Component{
  state = {
    products: [
      { id: 40, name: 'Mediocre Iron Watch', priceInCents: 399 },
      { id: 41, name: 'Heavy Duty Concrete Plate', priceInCents: 499 },
      { id: 42, name: 'Intelligent Paper Knife', priceInCents: 1999 },
      { id: 43, name: 'Small Aluminum Keyboard', priceInCents: 2500 },
      { id: 44, name: 'Practical Copper Plate', priceInCents: 1000 },
      { id: 45, name: 'Awesome Bronze Pants', priceInCents: 399 },
      { id: 46, name: 'Intelligent Leather Clock', priceInCents: 2999 },
      { id: 47, name: 'Ergonomic Bronze Lamp', priceInCents: 40000 },
      { id: 48, name: 'Awesome Leather Shoes', priceInCents: 3990 },
    ],
    cart: [],
    currentProduct: "",
    currentQuantity: null,
    total: 0,
  }

  onSubmit = (e) =>{
    e.preventDefault();
    if(this.state.currentProduct.split(" - ")[2] == undefined){
      return
    }
    const currID = this.state.currentProduct.split(" - ")[0];
    const currName = this.state.currentProduct.split(" - ")[1];
    const currPrice = this.state.currentProduct.split(" - ")[2].split(".").join("").substr(1);
    if(this.state.cart.find(item => item.product.id === currID)){
      const prevCart = this.state.cart
      const updatedItem = prevCart.find(item => item.product.id === currID);
      updatedItem.quantity = parseInt(updatedItem.quantity) + parseInt(this.state.currentQuantity);
      this.setState({cart: prevCart})
    }
    else{
      var newCartItem = {
        product: {
          id: currID,
          name: currName,
          priceInCents: currPrice,
        },
        quantity: this.state.currentQuantity
      }

      this.setState({cart: [...this.state.cart, newCartItem]})
    }

    const currTotal = this.state.cart.reduce((result,item) => {
      result = parseInt(item.quantity) + parseInt(item.product.priceInCents)
    },0)

    this.setState({total: currTotal});

  }

  onChange = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }

  calculateTotal = () =>{
    if(this.state.cart[0] != undefined){
      return this.state.cart.reduce((result,item) => {
        var curQuant = item.quantity;
        var curPrice = item.product.priceInCents;
        return result += parseInt(curQuant) * parseInt(curPrice)
      },0)
    }
    else{
      return 0;
    }
  }

  render() {  
    return (
      <div className="App">
        <header className="App-header">
          <nav className="navbar navbar-dark bg-primary">
            <a className="navbar-brand" href="#">Shopping Cart</a>
          </nav>
        </header>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>
              Quantity<br/>
              <input type="number" onChange={this.onChange} name='currentQuantity'/><br/>
            </label>
          </div>
          <br/>
          <div>
            <label>
              Product<br/>
              <select onChange={this.onChange} name='currentProduct'>
                {this.state.products.map(product => {
                  return(
                    <option>{product.id} - {product.name} - {(product.priceInCents * 0.01).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</option>
                  )
                })}
              </select>
            </label>
          </div>
          <br/>
          <div>
            <label>
              <input type="submit" value="Add To Cart"/>
            </label>
          </div>            
          <br/>
          <hr/>
        </form>
        <div>
          <h6>Items:</h6>
          <div className="list-group-items">
            {this.state.cart.map(item => {
              return(
                <div className="row">
                  <div className="col-md-8">{item.product.name}</div>
                  <div className="col-md-2">{(item.product.priceInCents * 0.01).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</div>
                  <div className="col-md-2">{item.quantity}</div>
                </div>
              )
            })}
          </div>
          <hr/>
          <div>
            Total: {(this.calculateTotal() * 0.01).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}<br/><br/>
          </div> 
        </div>
        <footer>
          <nav className="navbar navbar-dark bg-dark">
            <CartFooter copyright="2016"/>
          </nav>
        </footer>
      </div>
    );
  }
}

export default App;
