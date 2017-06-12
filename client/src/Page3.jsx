import React, {
  PureComponent
}
from 'react';
import {
  Link as RouterLink,
}
from 'react-router-dom';

import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import Button from 'react-md/lib/Buttons/Button';

import {
  registerGlobalState,
  unregisterGlobalState,
  subscribe,
  globalState
}
from './global.js';

export default class PaginationExample extends PureComponent {

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
    const rows = this.state.data.map(data => (
      <TableRow key={data.id}>
        <TableColumn>{data.title}</TableColumn>
        <TableColumn>{data.message}</TableColumn>
        <TableColumn>
          <Button className="" id={"edit-"+data.id} component={RouterLink} to={"/detail/"+data.id} flat label="Edit" style={{"textAlign":"center"}} />
          <Button className="" id={"delete-"+data.id} flat label="Delete" onClick={this._handleDeleteClick}  style={{"textAlign":"center"}} />
        </TableColumn>
      </TableRow>
    ));

    return (
      <section>
      <Button label="Add"  raised secondary onClick={this._handleAddClick} style={{"marginTop":"13px","right":"13px","float":"right","position":"absolute"}} />
      <DataTable plain>
        <TableHeader>
          <TableRow>
            <TableColumn>Title</TableColumn>
            <TableColumn>Message</TableColumn>
            <TableColumn></TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows}
        </TableBody>
      </DataTable>
      </section>
    );
  }
}