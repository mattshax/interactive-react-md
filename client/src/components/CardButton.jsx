import React, {
    PureComponent,
    PropTypes
}
from 'react';
import {
    Link as RouterLink,
}
from 'react-router-dom';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import injectInk from 'react-md/lib/Inks';
import Paper from 'react-md/lib/Papers';
import Button from 'react-md/lib/Buttons/Button';

class ImgCard extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
        // Injected from injectInk
        ink: PropTypes.node,
    };

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {
            title,
            message,
            to,
            ink,
            ...props
        } = this.props;

        return (
            <Paper
        {...props}
        zDepth={1}
        component={RouterLink}
        to={`/${to}`}
        className="md-cell img-card"
      >
        {ink}
        <CardTitle title={title} />
          <CardText>
              <p>{message}</p>
            </CardText>
            <Button component={RouterLink} to="/page-1" raised secondary label="View" style={{"marginTop":"10px","textAlign":"center"}} />
            <Button flat label="Delete" onClick={this._handleDeleteClick}  style={{"float":"right","marginTop":"10px","textAlign":"center"}} />
      </Paper>
        );
    }
}

export default injectInk(ImgCard);