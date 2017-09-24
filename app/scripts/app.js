import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/style.css';

export default class List extends Component {
    static defaultProps = {
        list: []
    }
    static propTypes = {
        list: PropTypes.array
    }
    state = {
        activeIndex: -1
    }

    handleClick = (event) => {
        const index = event.target.dataset.index;
        this.setState({
            activeIndex: index
        });
    }

    render() {
        const { activeIndex } = this.state;
        const { list } = this.props;
        const itmes = list.map((item, index) => {
            const cName = (index === +activeIndex) ? 'active' : '';
            return (
              <li key={index} data-index={index} className={cName} onClick={this.handleClick}>
                {item}
              </li>
            );
        });

        return (
          <ul>{itmes}</ul>
        );
    }
}
