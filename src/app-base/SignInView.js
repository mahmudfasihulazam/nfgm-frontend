
import React from 'react';
import { Redirect } from 'react-router-dom';
import FormPanel from './FormPanel';
import { Col } from 'react-bootstrap/lib';
import fire from '../util/fire';

class SignInView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: false
    }
    this.setState = this.setState.bind(this);
    this.notify = props.notify;
  }

  acceptUser() {
    this.setState({
      ...this.state,
      processing: false
    })
    this.notify(true);
  }

  rejectUser(error) {
    if('auth/user-not-found' === error.code) {
      window.alert("Email address not found");
    } else if('auth/wrong-password' === error.code) {
      window.alert("Incorrect password");
    } else {
      console.log(error);
      window.alert("Unknown error: Please contact the developers");
    }
    this.notify(false);
  }

  signInUser(userInfo) {
    this.setState({
      ...this.state,
      processing: true
    });
    fire.auth().signInWithEmailAndPassword(userInfo.Email, userInfo.Password)
      .then(this.acceptUser.bind(this))
      .catch(this.rejectUser.bind(this));
  }

  render() {
    return (
      fire.auth().currentUser
      ? (<Redirect to='/home'/>)
      : (
        <Col className='text-content' sm={12}>
          <Col sm={3} md={4}/>
          <FormPanel
            size={{sm: 6, md: 4, lg: 4}}
            fields={[
              { title: 'Email', type: 'email', optional: false, value: ""},
              { title: 'Password', type: 'password', optional: false, value: ""}
            ]}
            submitName='Sign in'
            onSubmit={this.signInUser.bind(this)}
          />
          <Col sm={3} md={4}/>
        </Col>
      )
    );
  }

}

export default SignInView;
