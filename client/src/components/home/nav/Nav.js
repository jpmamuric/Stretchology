import React, { Component } from 'react';
import { Link }             from 'react-router';
import { connect }          from 'react-redux';

import './Nav.css';
import NavBar               from '../custom-mui/Navbar';
import Drawer               from 'material-ui/Drawer';
import StripePayments       from '../payments/Stripe';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, credits: 0 };
    this.handleClose = this.handleClose.bind(this);
  }

  handleLeftTouchTap(){
    this.setState({ open: true });
  }

  handleClose(){
    this.setState({ open: false });
  }

  renderDrawerHeader(){
    const { user } = this.props;
    switch (user) {
      case null:
        return <div>loading...</div>
      case false:
        return (
          <div className='sidebar_header flex_me box_shadow'>
            <div className='sidebar_content flex_me'>
              <Link to='/'
                onClick={this.handleClose}
                className='sidebar_header_title'>Stretchology</Link>
            </div>
          </div>
        )
      default:
        return (
          <div className='sidebar_header flex_me box_shadow'>
            <Link to='/'
              className='sidebar_img flex_me' onClick={this.handleClose}>
              <div >IMAGE</div>
            </Link>
            <div className='sidebar_content flex_me'>
              <div>{user.googleDisplayName}</div>
              <div className='sidebar_view_profile'>credits: ${user.credits}.00</div>
            </div>
          </div>
        )
    }

  }

  renderLinks(){
    const { user } = this.props
    switch (user) {
      case null:
        return <div>loading...</div>
      case false:
        return (
          <div className='sidebar_link'>
            <Link
              className='sidebar_link' to='/booking' onClick={this.handleClose}>Book a Session
            </Link>
            <div className='sidebar_link'>
              <a href='/auth/google'
                onClick={this.handleClose}>Signin with Google
              </a>
            </div>
          </div>
        )
      default:
        return (
          <div>
            <Link
              className='sidebar_link' to='/booking' onClick={this.handleClose}>Book a Session
            </Link>
            <div onClick={this.handleClose}>
              <StripePayments />
            </div>
            <div className='sidebar_link'>
              <a href='/api/logout'>Signout</a>
            </div>
          </div>
        )
    }
  }

  render(){
    // const { credits, googleFirstName } = this.props.user;
    return (
      <div className='navbar_container'>
        {/* Alternatively can use es6 fat arrow instead of binding to constructor */}
        <NavBar
          title='Stretchology'
          onLeftIconButtonTouchTap={()=>this.handleLeftTouchTap()} />

        {/* Cannot call setState until binding to constructor */}
        <Drawer
          className='drawer'
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={this.handleClose}>

          <div className='sidebar flex_me'>
            {this.renderDrawerHeader()}
            {this.renderLinks()}
          </div>

        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
}

export default connect(mapStateToProps)(Nav);
