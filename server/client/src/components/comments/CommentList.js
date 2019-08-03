import './List.css';
import React from 'react';
import CommentDetail from './CommentDetail';
import ReviewCard from './ReviewCard';
const CommentList = (props) => {
  const comments = props.comments.map((comment) => {
    return(
      <ReviewCard key={comment._id}>
        <CommentDetail
          comment={comment}
        />
      </ReviewCard>
    )
  })
  return (
    <div className="comment-list">
        {comments}
    </div>
  );
};

export default CommentList;
