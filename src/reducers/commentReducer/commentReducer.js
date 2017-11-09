import actionType from './commentAction';

// reducer
export default (state, action) => {
  if (!state) {
    return {
      comments: []
    };
  }
  let comments = [];
  switch (action.type) {
    case actionType.INIT_COMMENTS:
    case actionType.DND_COMMENT:
      return {
        comments: action.comments
      };
    case actionType.ADD_COMMENT:
      return {
        comments: [...state.comments, action.comment]
      };
    case actionType.DELETE_COMMENT:
      comments = state.comments.filter(comment => !(comment.createdTime === action.createdTime));
      return {
        comments
      };
    case actionType.EDIT_COMMENT:
      comments = state.comments.map((comment) => {
        if (comment.createdTime === action.comment.createdTime) {
          return action.comment;
        }
        return comment;
      });
      return {
        comments
      };
    default:
      return state;
  }
};
