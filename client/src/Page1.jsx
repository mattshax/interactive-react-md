import React, {
  Component,
}
from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import {
  registerGlobalState,
  unregisterGlobalState,
  subscribe,
  globalState
}
from './global.js';

export default class Page1 extends Component {

  state = {
    data: [],
  };

  componentWillMount() {
    registerGlobalState(this);
  }
  
  componentDidMount() {
    //console.log(globalState)
    this.setState(globalState);
  }
  
  componentWillUnmount() {
    unregisterGlobalState(this);
  }

  [subscribe('data')](data) {
    this.setState({
      data
    });
  }
  
  render() {

    return (
      <div className="md-grid">
        <h2 className="md-cell md-cell--12">
          Page 1
        </h2>
        {this.state.data.map(data =>
          (<Card className="md-cell" key={data.id}>
            <CardTitle title={data.message} />
            <CardText>
              <p>{data.id}</p>
            </CardText>
          </Card>),
        )}
      </div>
    );
  }
}
