import classNames from "classnames";
import React, {Component} from "react";
import * as MoviesAction from "../../actionCreators/moviesActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import "./login.css";

export class Login extends Component {

  constructor(props, context) {
    super(props, context);
    this.displayName = 'containers/Login';
    this.onClickMaskHandler = this.onClickMaskHandler.bind(this);
    this.onClickSubmitHandler = this.onClickSubmitHandler.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      password: null
    };
  }

  onClickMaskHandler(e) {
    if (this.props.inFlight) {
      e.stopPropagation();
      return false;
    }
    return true;
  }

  onClickSubmitHandler(e) {
    e.stopPropagation();
    this.props.moviesActionDispatcher.initiateRequest(this.state.password);
    return false;
  }

  onChangePassword(e) {
    this.setState({password: e.target.value});
  }

  render() {
    let {movies} = this.props;
    return (
      <div className={classNames('login-mask', {
        'login-mask--on': movies.length === 0,
        'login-mask--off': movies.length !== 0
      })}
           onClick={this.onClickMaskHandler}
           id="login-mask"
           data-component-name={this.displayName}
           ref={(lm) => {
             if (lm !== null) { // because of react, we need to test if it is null.
               // This bit of code makes sure all the content is fully covered.
               var body = document.body,
                 html = document.documentElement;
               var height = Math.max(body.scrollHeight, body.offsetHeight,
                 html.clientHeight, html.scrollHeight, html.offsetHeight);
               lm.style.height = height + 'px';
             }
           }}>
        <div
          id="login-mask-message-wrapper"
          className={classNames({
            'login-mask--message--on': movies.length === 0,
            'login-mask--message--off': movies.length !== 0
          })}
          ref={(lmm) => {
            if (lmm !== null) { // this little bit of code moves the margin.
              lmm.style['margin-left'] = ((lmm.offsetWidth / 2) * -1) + 'px';
              lmm.style['margin-top'] = ((lmm.offsetHeight / 2) * -1) + 'px';
            }
          }}>
          <div role="alert" aria-busy="true">
            <label>Password: <input type="text" onChange={this.onChangePassword} required/></label>
            <button type="button" onClick={this.onClickSubmitHandler}>submit</button>
            {this.props.isError ? <div className="login-mask--error-message">{this.props.message}</div> : null}
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

let mapStateToProps = (state /**, ownProps **/) => {
  return {
    movies: state.moviesReducer.movies,
    message: state.messageReducer.message,
    isError: state.messageReducer.isError
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    moviesActionDispatcher: bindActionCreators(MoviesAction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps /**, mergeProps **/)(Login);

Login.propTypes = {
  children: PropTypes.node.isRequired,
};