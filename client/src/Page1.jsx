import React, {
  Component,
}
from 'react';
import {
  Link as RouterLink,
}
from 'react-router-dom';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import Button from 'react-md/lib/Buttons/Button';
//import LoremIpsum from './components/LoremIpsum';
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
    console.log(globalState)
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

  _handleDeleteClick = ((e) => {

    const id = e.target.id.split("-")[1];

    fetch(`${globalState.apiPath}data/remove/${id}`)
      .then(res => res.text())
      .then((data) => {

      });

  })

  _handleAddClick = (() => {
    fetch(`${globalState.apiPath}data/add`)
      .then(res => res.text())
      .then((data) => {

      });
  })

  render() {

    return (
      <div className="md-grid">
        <h2 className="md-cell md-cell--12">
          Page 1
          <Button label="Add"  raised secondary onClick={this._handleAddClick} style={{"float":"right"}} />
        </h2>
        {this.state.data.map(data =>
          (
         <Card className="md-cell" key={data.id} type={null}>
            <CardTitle title={data.title} />
            <CardText>
              <p>{data.message}</p>
            </CardText>
            <Button component={RouterLink} to={"/detail/"+data.id} raised secondary label="Edit" style={{"marginTop":"10px","textAlign":"center"}} />
            <Button id={"delete-"+data.id} flat label="Delete" onClick={this._handleDeleteClick}  style={{"float":"right","marginTop":"10px","textAlign":"center"}} />
          </Card>
          ),
        )}
      </div>
    );
  }
}

//  <CardButton title={data.title} message={data.message} to='page-2' key={data.id} />
