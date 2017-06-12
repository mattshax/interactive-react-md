import React, {
  Component,
}
from 'react';
import {
  Link as RouterLink,
  Redirect
}
from 'react-router-dom';
import Button from 'react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields';
//import LoremIpsum from './components/LoremIpsum';
import {
  registerGlobalState,
  unregisterGlobalState,
  //subscribe,
  globalState
}
from './global.js';

export default class Page1 extends Component {

  state = {
    detailID: null,
    redirect: null
  };

  componentWillMount() {
    const id = parseFloat(this.props.location.pathname.replace("/detail/", ""));
    this.setState({
      detailID: id
    });
    registerGlobalState(this);
  }

  componentDidMount() {
    console.log(globalState);
    this.setState(globalState);
  }

  componentWillUnmount() {
    unregisterGlobalState(this);
  }

  _handleDeleteClick = (() => {
    fetch(`${globalState.apiPath}data/remove`)
      .then(res => res.text())
      .then((data) => {

      });
  })

  _handleSubmitClick = (() => {
    const data = {
      title: document.getElementById(`title-${this.state.detailID}`).value,
      message: document.getElementById(`message-${this.state.detailID}`).value
    }
    fetch(`${globalState.apiPath}data/edit/${this.state.detailID}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(res => res.text())
      .then((data) => {
        console.log(data);
        this.setState({redirect: true});
      });
  })

  render() {

    if (this.state.redirect) {
      return <Redirect push to="/page-1" />;
    }

    const data = globalState.data;

    if (!data) {
      return null
    }
    let selectedData = null;
    try {
      const id = this.state.detailID;
      let index = null;
      for (var i = 0; i < data.length; i++) {
        if (id === data[i].id) {
          index = i;
        }
      }
      if (index != null) {
        selectedData = data[index];
      }
    }
    catch (e) {}

    let title = ""
    let message = ""
    if (selectedData) {
      title = selectedData.title;
      message = selectedData.message;
    }

    return (
      <section className="md-grid md-cell--12" aria-labelledby={`new-row-group-${this.state.detailID}`}>
          <h2 className="md-cell md-cell--12">
            Detail - {this.state.detailID}
          </h2>
          <div className="md-cell--6" style={{"margin":"8px"}}>
            <TextField
                id={`title-${this.state.detailID}`}
                name={`title-${this.state.detailID}`}
                type="text"
                label="title"
                defaultValue={title}
                className="md-cell--12 md-cell--bottom"
            />
            <TextField
                id={`message-${this.state.detailID}`}
                name={`message-${this.state.detailID}`}
                type="text"
                label="message"
                defaultValue={message}
                className="md-cell--12 md-cell--bottom"
            />
            <Button raised secondary label="Submit" onClick={this._handleSubmitClick}  style={{"float":"left","marginTop":"10px","textAlign":"center"}} />
            <Button flat label="Cancel" component={RouterLink} to="/page-1" style={{"float":"right","marginTop":"10px","textAlign":"center"}} />
          </div>
      </section>
    );
  }
}

//  <CardButton title={data.title} message={data.message} to='page-2' key={data.id} />
