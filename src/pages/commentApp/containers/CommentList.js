import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import update from 'immutability-helper';
import { initComments, deleteComment, editComment, dndComments } from '../../../reducers/commentReducer/commentActionCreator';
import CommentList from '../components/CommentList';

const mapStateToProps = ({ commentState }) => ({
  comments: commentState.comments
});

// const mapDispatchToProps = (dispatch) => ({
//     deleteComment(createdTime) {
//         dispatch(deleteComment(createdTime));
//     },

//     initComments(comments) {
//         dispatch(initComments(comments));
//     }
// });
const mapDispatchToProps = dispatch => bindActionCreators({ deleteComment, initComments, editComment, dndComments }, dispatch);

/*
** 一个 Smart 组件, 负责评论列表数据的加载、初始化、删除评论, 沟通 CommentList 和 state.
*/
@connect(mapStateToProps, mapDispatchToProps)
export default class CommentListContainer extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    initComments: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired,
    dndComments: PropTypes.func.isRequired,
  }

  componentWillMount() {
    // componentWillMount 生命周期中初始化评论
    this._loadComments();
  }

  _loadComments() {
    let comments = localStorage.getItem('comments');
    comments = comments ? JSON.parse(comments) : [];

    // this.props.initComments 是 connect 传进来的, 帮我们把数据初始化到 state 里面去
    if (this.props.initComments) {
      this.props.initComments(comments);
    }
  }

  deleteComment = (createdTime) => {
    const comments = this.props.comments.filter(comment => !(comment.createdTime === createdTime));
    this.storeComments(comments);

    // this.props.deleteComment 是 connect 传进来的, 会 dispatch 一个 action 去删除评论
    if (this.props.deleteComment) {
      this.props.deleteComment(createdTime);
    }
  }

  editComment = (comment) => {
    const comments = this.props.comments.map((commentInside) => {
      if (commentInside.createdTime === comment.createdTime) {
        return comment;
      }
      return commentInside;
    });

    this.storeComments(comments);

    // this.props.editComment 是 connect 传进来的, 会 dispatch 一个 action 去删除评论
    if (this.props.editComment) {
      this.props.editComment(comment);
    }
  }

  dndComments = (dragIndex, hoverIndex) => {
    let { comments } = this.props;
    [comments[dragIndex], comments[hoverIndex]] = [comments[hoverIndex], comments[dragIndex]];
    comments = [...comments];

    // const dragComment = comments[dragIndex];
    // comments = update(comments, {
    //     $splice: [[dragIndex, 1], [hoverIndex, 0, dragComment]],
    // });

    this.storeComments(comments);

    if (this.props.dndComments) {
      this.props.dndComments(comments);
    }
  }

  storeComments(comments) {
    // 更新 localStorage 里面的 comments 数据
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  render() {
    return (
      <CommentList
        comments={this.props.comments}
        deleteComment={this.deleteComment}
        editComment={this.editComment}
        dndComments={this.dndComments}
      />
    );
  }
}
