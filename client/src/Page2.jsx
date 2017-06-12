import React, {
  Component,
}
from 'react';

import CSSTransitionGroup from 'react-addons-css-transition-group';

import Tabs from 'react-md/lib/Tabs/Tabs';
import TabsContainer from 'react-md/lib/Tabs/TabsContainer';
import Tab from 'react-md/lib/Tabs/Tab';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import Slider from 'react-md/lib/Sliders';

import FontIcon from 'react-md/lib/FontIcons';

import List from 'react-md/lib/Lists/List';
import ListItemControl from 'react-md/lib/Lists/ListItemControl';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';

const chat = <FontIcon key="chat">chat</FontIcon>;

import {
  registerGlobalState,
  unregisterGlobalState,
  subscribe,
  globalState
}
from './global.js';

export default class Page2 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTabIndex: 0,
      tabTwoChildren: null,
      data: []
    };
    this._handleTabChange = this._handleTabChange.bind(this);
  }

  _handleTabChange(activeTabIndex) {
    if (activeTabIndex === 1 && !this.state.tabTwoChildren) {
      // Fake async loading
      this._timeout = setTimeout(() => {
        this._timeout = null;

        this.setState({
          tabTwoChildren: [
            <Slider id="slider" defaultValue={30} key="slider" className="md-cell md-cell--6" />,
          ],
        });
      }, 800);
    }

    this.setState({
      activeTabIndex
    });
  }

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

  _handleDeleteClick = function() {
    fetch(`${globalState.apiPath}data/remove`)
      .then(res => res.text())
      .then((data) => {

      });
  }

  render() {

    const {
      activeTabIndex
    } = this.state;
    let {
      tabTwoChildren
    } = this.state;

    if (!tabTwoChildren && activeTabIndex === 1) {
      tabTwoChildren = <CircularProgress id="loading-tab-two" key="loading" className="md-cell md-cell--6"/>;
    }

    return (
      <TabsContainer fixed={false} onTabChange={this._handleTabChange} activeTabIndex={activeTabIndex} panelClassName="md-grid" colored>
        <Tabs tabId="tab">
          <Tab label="Tab One">
           <div className="md-grid md-cell--12">
    <List className="md-cell--6 md-paper md-paper--1">
    {this.state.data.map(data =>
      <ListItemControl
        key={data.id}
        rightIcon={chat}
        primaryAction={
          <Checkbox
            id={"lineItem"+data.id}
            name="lineItems"
            label={data.title + " - " + data.message}
            defaultChecked
          />
        }
      />
    )}
    </List>
    </div>
          </Tab>
          <Tab label="Tab Two">
            <CSSTransitionGroup
              component="div"
              className="md-cell md-cell--12"
              transitionName="md-cross-fade"
              transitionEnterTimeout={300}
              transitionLeave={false}
            >
              {tabTwoChildren}
            </CSSTransitionGroup>
          </Tab>
        </Tabs>
      </TabsContainer>
    );
  }

}
