import React from 'react';

const CommentDetail = ({ comment }) => {

  return (
    <div className="comment">
      <div className="avatar">
        <img src={comment.authorProfileImageUrl} alt="avatar"/>
      </div>
      <div className="content">
        <div className="author">
          {comment.authorDisplayName}
        </div>
        <div className="metadata">
          <span className="date">
            <strong>Published at:</strong>{' '}
            {new Date(comment.publishedAt).toDateString()}
          </span>
        </div>
        <div className="text">
          <span
            dangerouslySetInnerHTML={{
              __html: comment.textDisplay
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentDetail;
