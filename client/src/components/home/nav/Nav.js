import React, { Component } from 'react';
import { Link }             from 'react-router';
import { connect }          from 'react-redux';

import * as actions         from '../../../actions/auth';

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
                className='sidebar_header_title'>
                Stretchology
              </Link>
            </div>
          </div>
        )
      default:
        return (
          <div className='sidebar_header flex_me box_shadow'>
            <div onClick={this.handleClose} className='sidebar_img flex_me'>
              <Link to='/'>
                Image
              </Link>
            </div>

            <div className='sidebar_content flex_me'>
              <div>
                {user.googleDisplayName}
              </div>
              {
                user.contractor
                ? null
                : <div className='sidebar_view_profile'>credits: ${user.credits}.00</div>
              }
            </div>
          </div>
        )
    }

  }

  renderLinks(){
    const { user, removeSocketId } = this.props
    switch (user) {
      case null:
        return <div>loading...</div>
      case false:
        return (
          <div className='sidebar_link'>
            <a href='/auth/google'
              onClick={this.handleClose}>Signin with Google
            </a>
          </div>
        )
      default:
        return (
          <div>
            <div className='sidebar_link'>
              {
                user.contractor
                ? null
                : (
                  <Link
                     to='/bookings' onClick={this.handleClose}>Book a Session
                  </Link>
                )
              }
            </div>
            <div onClick={this.handleClose}>
              {
                user.contractor
                ? null
                : <StripePayments />
              }
            </div>
            <div className='sidebar_link' onClick={()=>removeSocketId()}>
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

export default connect(mapStateToProps, actions)(Nav);
