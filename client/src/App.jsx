import React, {
  Component,
}
from 'react';
import {
  Link as RouterLink,
  Route,
  Switch,
}
from 'react-router-dom';

import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import FontIcon from 'react-md/lib/FontIcons';
import {
//  registerGlobalState,
//  unregisterGlobalState,
  globalState
}
from './global.js';

import Home from './Home';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';

function isActive(to, path) {
  return to === path;
}

class App extends Component {

  componentWillMount() {
   // registerGlobalState(this);
  }

  componentDidMount() {
    this.handlePubSubData('loading initial data');
    console.log('subscribing to events');
    this.subscribePubSubData();
  }

  componentWillUnmount() {
   // unregisterGlobalState(this);
    console.log('stopping event subscription');
    this.ev.close();
  }

  apiPath = 'http://localhost:3001/api/v1/';

  handlePubSubData(e) {
    //console.log(e);
    fetch(`${this.apiPath}data`)
      .then(res => res.json())
      .then((data) => {
        //this.setState({
        //  users,
        //});
        //console.log(this.state)
        globalState.data = data;
        //console.log(globalState)
      });

  }

  subscribePubSubData() {
    this.ev = new EventSource(`${this.apiPath}data/stream`);
    this.ev.addEventListener('message', e => this.handlePubSubData(e), false);

    /*
     if (this.ev.readyState == EventSource.CLOSED){
       console.log('establishing connection')
      
     }
     else{
       console.log('connection already established');
     }
     */
  }

  render() {
      return (
          <Route
        render={({ location }) => (
          <NavigationDrawer
            drawerTitle="Bootstrap"
            toolbarTitle="Interactive React-MD"
            includeDrawerHeader={true}
            toolbarStyle={{"boxShadow":"0 0 0 0 rgba(0, 0, 0, 0)"}}
            drawerType="persistent" // persistent, floating
            navItems={[{
              component: RouterLink,
              to: '/',
              active: isActive('/', location.pathname),
              primaryText: 'Home',
              leftIcon: <FontIcon>home</FontIcon>,
            }, {
              component: RouterLink,
              to: '/page-1',
              active: isActive('/page-1', location.pathname),
              primaryText: 'Page 1',
              leftIcon: <FontIcon>bookmark</FontIcon>,
            }, {
              component: RouterLink,
              to: '/page-2',
              active: isActive('/page-2', location.pathname),
              primaryText: 'Page 2',
              leftIcon: <FontIcon>donut_large</FontIcon>,
            }, {
              component: RouterLink,
              to: '/page-3',
              active: isActive('/page-3', location.pathname),
              primaryText: 'Page 3',
              leftIcon: <FontIcon>flight_land</FontIcon>,
            }]}
          >
            <Switch key={location.key}>
              <Route exact path="/" location={location} component={Home} />
              <Route path="/page-1" location={location} component={Page1} />
              <Route path="/page-2" location={location} component={Page2} />
              <Route path="/page-3" location={location} component={Page3} />
            </Switch>
          </NavigationDrawer>
        )}
      />
    );
  }
}


export default App;
