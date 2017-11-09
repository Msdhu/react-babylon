import actionType from './commentAction';

// action creators
export const initComments = comments => ({
  type: actionType.INIT_COMMENTS,
  comments
});

export const addComment = comment => ({
  type: actionType.ADD_COMMENT,
  comment
});

export const deleteComment = createdTime => ({
  type: actionType.DELETE_COMMENT,
  createdTime
});

export const editComment = comment => ({
  type: actionType.EDIT_COMMENT,
  comment
});

export const dndComments = comments => ({
  type: actionType.DND_COMMENT,
  comments
});
