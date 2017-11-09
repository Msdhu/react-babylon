import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CommentList from './containers/CommentList';
import CommentInput from './containers/CommentInput';
import './comment.css';

@DragDropContext(HTML5Backend)
export default class CommentsPage extends Component {
  render() {
    return (
      <div className="wrapper">
          <CommentInput />
          <CommentList />
      </div>
    );
  }
}
