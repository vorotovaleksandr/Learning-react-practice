import React, { Component,Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {  
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    componentDidMount() {  
      axios({
        url: 'http://localhost:5000/checkToken',
        method: 'POST'                 
      }).then(res => {  
        this.setState({ loading: false });
        
      }).catch( () => {
        this.setState({ loading: false, redirect: true });  
      })
    }
    render() { 
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <Fragment>
          <ComponentToProtect {...this.props} />
        </Fragment>
      );
    }
  }
}