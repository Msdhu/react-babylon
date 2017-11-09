import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../reducers/commentReducer/commentActionCreator';
import CommentInput from '../components/CommentInput';

const mapStateToProps = ({ commentState }) => ({
  comments: commentState.comments
});

const mapDispatchToProps = dispatch => ({
  addComment(comment) {
    dispatch(addComment(comment));
  }
});

// 负责用户名的加载、保存，评论的发布
@connect(mapStateToProps, mapDispatchToProps)
export default class CommentInputContainer extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    addComment: PropTypes.func.isRequired,
  }

  state = {
    username: ''
  }

  componentWillMount() {
    this._loadUserName();
  }

  _loadUserName() {
    const username = localStorage.getItem('username');
    if (username) {
      this.setState({
        username
      });
    }
  }

  saveUserName = (username) => {
    localStorage.setItem('username', username);
  }

  submit = (comment) => {
    const comments = [...this.props.comments, comment];
    localStorage.setItem('comments', JSON.stringify(comments));

    if (this.props.addComment) {
      this.props.addComment(comment);
    }
  }

  render() {
    return (
      <CommentInput username={this.state.username} saveUserName={this.saveUserName} submit={this.submit} />
    );
  }
}
