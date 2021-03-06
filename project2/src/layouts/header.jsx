import React from 'react'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from 'reactstrap'
import { logoutUser } from '../redux/auth/actions'
import { connect } from 'react-redux'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      color: 'transparent',
    }
    this.toggle = this.toggle.bind(this)
    this.dropdownToggle = this.dropdownToggle.bind(this)
    this.sidebarToggle = React.createRef()
  }

  toggle () {
    if (this.state.isOpen) {
      this.setState({
        color: 'transparent',
      })
    } else {
      this.setState({
        color: 'dark',
      })
    }
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  dropdownToggle (e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }

  getBrand () {
    let brandName = ''
    this.props.routes.map(prop => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name
      }
      return null
    })
    return brandName
  }

  getRoute () {
    let route = '/'
    this.props.routes.map(prop => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        route = prop.layout + prop.path
      }
      return null
    })
    return route
  }

  openSidebar () {
    document.documentElement.classList.toggle('nav-open')
    this.sidebarToggle.current.classList.toggle('toggled')
  }

  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  updateColor () {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: 'dark',
      })
    } else {
      this.setState({
        color: 'transparent',
      })
    }
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateColor.bind(this))
  }

  componentDidUpdate (e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open')
      this.sidebarToggle.current.classList.toggle('toggled')
    }
  }

  render () {
    return (
      <Navbar color={this.state.color} expand="lg"
              className={`navbar-absolute fixed-top ${this.state.color === 'transparent' ? 'navbar-transparent ' : ''}`}>
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={this.sidebarToggle}
                className="navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <span className="navbar-toggler-bar bar1"/>
                <span className="navbar-toggler-bar bar2"/>
                <span className="navbar-toggler-bar bar3"/>
              </button>
            </div>
            {this.props.routes.map((route, index) => (
              <NavbarBrand key={index} className="d-lg-block d-none border-dark border-right pr-3" href={process.env.REACT_APP_BASE_URL + route.layout + route.path}>{route.name}</NavbarBrand>
            ))}
            <NavbarBrand className="d-lg-none d-block" href={this.getRoute()}>{this.getBrand()}</NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab"/>
            <span className="navbar-toggler-bar navbar-kebab"/>
            <span className="navbar-toggler-bar navbar-kebab"/>
          </NavbarToggler>
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="justify-content-end"
          >
            {/*<form>*/}
            {/*  <InputGroup className="no-border">*/}
            {/*    <Input placeholder="Search..."/>*/}
            {/*    <InputGroupAddon addonType="append">*/}
            {/*      <InputGroupText>*/}
            {/*        <i className="nc-icon nc-zoom-split"/>*/}
            {/*      </InputGroupText>*/}
            {/*    </InputGroupAddon>*/}
            {/*  </InputGroup>*/}
            {/*</form>*/}
            <Nav navbar>
              {/*<NavItem>*/}
              {/*  <Link to="#pablo" className="nav-link btn-magnify">*/}
              {/*    <i className="nc-icon nc-layout-11"/>*/}
              {/*    <p>*/}
              {/*      <span className="d-lg-none d-md-block">Stats</span>*/}
              {/*    </p>*/}
              {/*  </Link>*/}
              {/*</NavItem>*/}
              {/*<Dropdown*/}
              {/*  nav*/}
              {/*  isOpen={this.state.dropdownOpen}*/}
              {/*  toggle={(e) => this.dropdownToggle(e)}*/}
              {/*>*/}
              {/*  <DropdownToggle caret nav>*/}
              {/*    <i className="nc-icon nc-bell-55"/>*/}
              {/*    <p>*/}
              {/*      <span className="d-lg-none d-md-block">Some Actions</span>*/}
              {/*    </p>*/}
              {/*  </DropdownToggle>*/}
              {/*  <DropdownMenu right>*/}
              {/*    <DropdownItem tag="a">Action</DropdownItem>*/}
              {/*    <DropdownItem tag="a">Another Action</DropdownItem>*/}
              {/*    <DropdownItem tag="a">Something else here</DropdownItem>*/}
              {/*  </DropdownMenu>*/}
              {/*</Dropdown>*/}
              {/*<NavItem>*/}
              {/*  <Link to="#pablo" className="nav-link btn-rotate">*/}
              {/*    <i className="nc-icon nc-settings-gear-65"/>*/}
              {/*    <p>*/}
              {/*      <span className="d-lg-none d-md-block">Account</span>*/}
              {/*    </p>*/}
              {/*  </Link>*/}
              {/*</NavItem>*/}
              <NavItem>
                <Link to="#pablo" onClick={() => this.props.logoutUser(this.props.history)}
                      className="nav-link btn-rotate">
                  <i className="nc-icon nc-share-66 rotate-90"/>
                  <p>
                    <span className="d-lg-none d-md-block">Logout</span>
                  </p>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

const mapStateToProps = ({ authUser }) => {
  const { user, loading, error } = authUser
  return { user, loading, error }
}

const mapActionsToProps = { logoutUser }

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Header)
