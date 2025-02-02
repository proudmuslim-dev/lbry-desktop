import { connect } from 'react-redux';
import Comment from './view';
import { makeSelectClaimIsMine, makeSelectClaimForUri } from 'redux/selectors/claims';
import { doResolveUri } from 'redux/actions/claims';
import { doToast } from 'redux/actions/notifications';
import { makeSelectMyReactionsForComment, makeSelectOthersReactionsForComment } from 'redux/selectors/comments';
import { doCommentReact } from 'redux/actions/comments';
import { selectActiveChannelClaim } from 'redux/selectors/app';

const select = (state, props) => {
  const activeChannelClaim = selectActiveChannelClaim(state);
  const activeChannelId = activeChannelClaim && activeChannelClaim.claim_id;
  const reactionKey = activeChannelId ? `${props.commentId}:${activeChannelId}` : props.commentId;

  return {
    claim: makeSelectClaimForUri(props.uri)(state),
    claimIsMine: makeSelectClaimIsMine(props.uri)(state),
    myReacts: makeSelectMyReactionsForComment(reactionKey)(state),
    othersReacts: makeSelectOthersReactionsForComment(reactionKey)(state),
    activeChannelId,
  };
};

const perform = (dispatch) => ({
  resolve: (uri) => dispatch(doResolveUri(uri)),
  react: (commentId, type) => dispatch(doCommentReact(commentId, type)),
  doToast: (params) => dispatch(doToast(params)),
});

export default connect(select, perform)(Comment);
