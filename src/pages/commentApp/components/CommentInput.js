import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CommentInput extends Component {

  static propTypes = {
    username: PropTypes.any.isRequired,
    saveUserName: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
  }

  state = {
    username: this.props.username,
    content: '',
  }

  componentDidMount() {
    this.textarea.focus();
  }

  handleSubmit = () => {
    const { username, content } = this.state;
    if (!username) {
      console.log('请输入用户名!');
      return;
    }
    if (!content) {
      console.log('请输入内容!');
      return;
    }

    this.setState({
      content: ''
    });

    if (this.props.submit) {
      this.props.submit({ createdTime: +new Date(), ...this.state });
    }
  }

  handleUserNameBlur = (event) => {
    const username = event.target.value;
    if (!username) {
      return;
    }

    if (this.props.saveUserName) {
      this.props.saveUserName(username);
    }
  }

  handleUserNameChange = (event) => {
    this.setState({
      username: event.target.value
    });
  }

  handleContentChange = (event) => {
    this.setState({
      content: event.target.value
    });
  }

  render() {
    const { username, content } = this.state;
    // 和普通 HTML 中的 onchange 事件不同, 在原生组件中, 只有 input 元素失去焦点才会触发 onchange 事件, 在 React 中, 只要元素的值被修改就会触发 onChange 事件.
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">用户名：</span>
          <div className="comment-field-input">
              <input type="text" value={username} onChange={this.handleUserNameChange} onBlur={this.handleUserNameBlur} />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论内容：</span>
          <div className="comment-field-input">
              <textarea value={content} onChange={this.handleContentChange} ref={(textarea) => { this.textarea = textarea; }} />
          </div>
        </div>
        <div className="comment-field-button">
          <button onClick={this.handleSubmit}>发布</button>
        </div>
      </div>
    );
  }
}
