import React, { PureComponent } from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

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

  render() {
    const rows = this.state.data.map(data => (
      <TableRow key={data.id}>
        <TableColumn>{data.title}</TableColumn>
        <TableColumn>{data.message}</TableColumn>
      </TableRow>
    ));

    return (
      <DataTable plain>
        <TableHeader>
          <TableRow>
            <TableColumn>Title</TableColumn>
            <TableColumn>Message</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows}
        </TableBody>
      </DataTable>
    );
  }
}