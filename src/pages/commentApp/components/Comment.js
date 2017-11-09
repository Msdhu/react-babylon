import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';

const commentSource = {
  beginDrag(props) {
    return {
      index: props.index
    };
  }
};

const commentTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveComment(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  }
};

@DragSource('comment', commentSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
@DropTarget('comment', commentTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Comment extends Component {

  static propTypes = {
    comment: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired,
    moveComment: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  }

  // 每个 Comment 组件实例会保存一个 timeString 状态, 用于该评论显示发布了多久
  state = {
    timeString: '',
    isEditing: false,
    content: this.props.comment.content,
  }

  componentWillMount() {
    this._updateTimeString();
    this._timer = setInterval(() => {
      this._updateTimeString();
    }, 5000);
  }

  componentDidUpdate() {
    this.textarea && this.textarea.focus();
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  getProcessedContent(content) {
    return content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '$gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
            .replace(/`([\s\S]+?)`/g, '<code>$1</code>');
  }

  handleDeleteComment = () => {
    const { comment } = this.props;
    if (this.props.deleteComment) {
      this.props.deleteComment(comment.createdTime);
    }
  }

  handleContentChange = (event) => {
    this.setState({
      content: event.target.value
    });
  }

  handleEditComment = () => {
    this.setState({
      isEditing: true
    });
  }

  handleContentBlur = () => {
    this.setState({
      isEditing: false
    });
    const { comment } = this.props;
    const { content } = this.state;
    comment.content = content;

    if (this.props.editComment) {
      this.props.editComment(comment);
    }
  }

  _updateTimeString() {
    const { comment } = this.props;
    const duration = Math.floor((+new Date() - comment.createdTime) / 1000);
    const timeString = duration >= 60
            ? `${Math.floor(duration / 60)} 分钟前`
            : `${Math.max(duration, 1)} 秒前`;

    this.setState({
      timeString
    });
  }

  render() {
    const { comment, connectDragSource, connectDropTarget, isDragging } = this.props;
    const { timeString, content, isEditing } = this.state;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      connectDropTarget(
        <div className="comment" style={{ opacity }}>
          <div className="comment-user">
            <span className="comment-username">{comment.username} </span>：
          </div>
          {
            (() => {
              if (!isEditing) {
                return (<p dangerouslySetInnerHTML={{ __html: this.getProcessedContent(comment.content) }} />);
              }
              return (
                <div className="comment-field-input">
                  <textarea
                    value={content}
                    onChange={this.handleContentChange}
                    onBlur={this.handleContentBlur}
                    ref={(textarea) => { this.textarea = textarea; }}
                  />
                </div>
              );
            })()
          }
          <span className="comment-createdtime">{timeString}</span>
          <span className="comment-delete" onClick={this.handleDeleteComment}>删除</span>
          <span className="comment-edit" onClick={this.handleEditComment}>编辑</span>
        </div>
      )
    );
  }
}
