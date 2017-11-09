import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

export default class CommentList extends Component {
  // The defaultProps will be used to ensure that this.props.comments will have a value if it was not specified by the parent component
  static defaultProps = {
    comments: []
  }

  static propTypes = {
    // array | bool | func | number | object | string | symbol | any | ...
    comments: PropTypes.array,
    deleteComment: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired,
    dndComments: PropTypes.func.isRequired,
  }

  handleDeleteComment = (createdTime) => {
    if (this.props.deleteComment) {
      this.props.deleteComment(createdTime);
    }
  }

  handleEditComment = (comment) => {
    if (this.props.editComment) {
      this.props.editComment(comment);
    }
  }

  moveComment = (dragIndex, hoverIndex) => {
    if (this.props.dndComments) {
      this.props.dndComments(dragIndex, hoverIndex);
    }
  }

  render() {
    const { comments } = this.props;
    return (
      <div>
        {
          comments.map((item, index) =>
            <Comment
              comment={item}
              key={item.createdTime}
              index={index}
              deleteComment={this.handleDeleteComment}
              editComment={this.handleEditComment}
              moveComment={this.moveComment}
            />
          )
        }
      </div>
    );
  }
}

/*
** 最佳实践, 应当避免在底层的展示性组件中混入对于状态的管理, 而应该将状态托管于某个高阶组件或者其他的状态容器中.
** 利用函数式声明组件(stateless component)可以彻底保证不会在组件中进行状态操作.
** 这种组件没有状态, 没有生命周期, 只是简单的接受 props 渲染生成 DOM 结构.
  const CommentList = ({ comments }) => {
    return (
      <div>
          { comments.map((item, index) => <Comment comment = {item} key = {index} />) }
      </div>
    );
  };

  // 这种无状态函数式组件的写法支持设置默认的Props类型与值的
  CommentList.defaultProps = {
    comments: []
  };

  CommentList.propTypes = {
    comments: PropTypes.array.isRequired
  };

  export default CommentList;
*/
