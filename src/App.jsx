import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './page/LoginPage'
import AfterLoginPage from './page/AfterLoginPage';

function App() {

  return (
    <>
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/blank-page" component={AfterLoginPage} />
      </Switch>
    </Router>
    </>
  )
}

export default App
