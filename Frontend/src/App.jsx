import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.min.css'
import RegisterForm from './components/pages/registerForm'
import ShiftsForm from './components/pages/shiftsForm'
import Home from './components/pages/home'
import Footer from './components/common/footer'
import MyNavBar from './components/common/navBar'
import React, { Component } from 'react'

class App extends Component {
  state = {}
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <header>
            <MyNavBar user={this.state.user}></MyNavBar>
          </header>
          <main className="mt-5">
            <Switch>
              <Route path="/employees/new" component={RegisterForm}></Route>
              <Route
                path="/shifts/:id"
                render={({ location }) => <ShiftsForm shift={location} />}
              ></Route>
              <Route path="/shifts/" component={ShiftsForm}></Route>
              {/* <Route path="/ranks/:rankType" component={Ranks}></Route> */}
              <Route path="/" exact component={Home}></Route>
            </Switch>
          </main>
        </BrowserRouter>
        <Footer />
      </div>
    )
  }
}

export default App
