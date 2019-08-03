import './List.css';
import React from 'react';
import { connect } from 'react-redux';
import SubjectCard from './SubjectCard';
import { fetchSubjects } from '../../actions';
// import requireAuth from '../requireAuth';
class SubjectList extends React.Component {
  componentDidMount() {
    this.props.fetchSubjects()
  }
  render() {
    const subjectItems = this.props.subjects.map(subject => (
      <SubjectCard key={subject._id} subject={subject} />
    ));
    if (!this.props.subjects.length > 0) {
      return (
        <div className="ui icon message">
          <i className="notched circle loading icon" />
          <div className="content">
            <div className="header">Just one second</div>
            <p>We're fetching data for you.</p>
          </div>
        </div>
      );
    }
    return <div className="subject-list">{subjectItems}</div>;
  }
}
const mapStateToProps = state => {
  return { subjects: state.subjects };
};
export default connect(mapStateToProps, {fetchSubjects})(SubjectList);
