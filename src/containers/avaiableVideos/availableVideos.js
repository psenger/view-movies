import React, {Component} from "react";
import * as MoviesAction from "../../actionCreators/moviesActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {VideoPlayer} from "../../componets/videoPlayer/videoPlayer";


export class AvailableVideos extends Component {

  constructor(props, context) {
    super(props, context);
    this.displayName = 'containers/AvailableVideos';
  }

  render() {
    let {movies = []} = this.props;

    return (
      <div>
        {movies.map(VideoPlayer)}
      </div>
    );
  }
}

let mapStateToProps = (state /**, ownProps **/) => {
  return {
    movies: state.moviesReducer.movies,
  };
};

AvailableVideos.defaultProps = {
  movies: []
};

let mapDispatchToProps = (dispatch) => {
  return {
    moviesActionDispatcher: bindActionCreators(MoviesAction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps /**, mergeProps **/)(AvailableVideos);
