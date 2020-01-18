// =================================================================
// Program: Example2Header.js - the header of the home of the 
//          example2
// Author : Bill Huang
// Date   : Oct 19 - Dec 18, 2019
// =================================================================

import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';

import {connect} from 'react-redux';
import {setLocale} from '../../actions/locale';

import { FormattedMessage} from 'react-intl';

import './Example2Header.css';

class Example2Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isTop: true,
      widthOfWin: window.innerWidth,
      heightOfWin: window.innerHeight,
      heightToTop: window.scrollY,
      opacityVar: 100,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions.bind(this));
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions.bind(this));
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const isTop = window.scrollY < 200;
    this.setState({heightToTop: window.scrollY});
    if (this.state.heightToTop<= 30) {
      this.setState({opacityVar: 1});
    } else if (this.state.heightToTop > 30 && this.state.heightToTop <= 200) {
      this.setState({opacityVar: Math.abs(0.08-(1/200) * this.state.heightToTop)});
      if (this.state.opacityVar < 0.8) {
        this.setState({opacityVar: 0.8});
      }
    } else {
      this.setState({opacityVar: 1});
    }
    if (isTop !== this.state.isTop) {
        this.setState({ isTop })
    }
  }  
  
  updateWindowDimensions() {
    this.setState({ widthOfWin: window.innerWidth, heightofWin: window.innerHeight });
  }

  switchLocale = () => {
    this.props.lang === 'en' ?
      this.props.setLocale('zh'):this.props.setLocale('en');
  }

  render() {

    const {lang} = this.props;

    console.log('width: '+this.state.widthOfWin);
    console.log('height: '+this.state.heightOfWin);
    console.log('height to top: '+this.state.heightToTop);

    // set the source of the image
    let srcLogoImage = ftExample2LogoColor;

    // set the color of the menu text
    let navLinkStyle = {color: 'black', };
    
    // set the default background color for header
    let bgDefault = ('dark');
    let fdHeaderBg = ('fd-header-bg-home');
    let fdHeaderContent = ('fd-header-content-home');
    let variantSelect = bgDefault;

    switch(this.props.callerName){
      case 'xxxx1':
        fdHeaderBg = ('fd-header-bg-home');
        fdHeaderContent = ('fd-header-content-home');
        bgDefault = ('#062236');

        if (this.state.heightToTop >= 200)
          bgDefault = ('white');
        if (this.state.heightToTop < 200) {
          if (this.state.widthOfWin >= 576) {
            variantSelect = bgDefault;
          } else {
            variantSelect = ('dark');
          }
        } else {
          variantSelect = ('white');
        }
    
        if (this.state.heightToTop < 200)
          navLinkStyle = {color: 'white', }
      
        if (this.state.heightToTop < 200)
          srcLogoImage = ftExample2LogoTransparent;
        break;

      case 'xxxx2':
        fdHeaderBg = ('fd-header-bg-partner');
        fdHeaderContent = ('fd-header-content-partner');
        bgDefault = ('white');
        variantSelect = ('dark');
        break;

      case 'xxxx3':
        fdHeaderBg = ('fd-header-bg-deliver');
        fdHeaderContent = ('fd-header-content-deliver');
        bgDefault = ('white');
        variantSelect = ('dark');
        break;

      case 'xxxx4':
        fdHeaderBg = ('fd-header-bg-faq');
        fdHeaderContent = ('fd-header-content-faq');
        bgDefault = ('white');
        variantSelect = ('dark');
    }

    fdHeaderBg = fdHeaderBg + ' ';

    console.log('caller: '+fdHeaderBg);
    console.log('variant: '+variantSelect);

    // set opacity of header
    let navBarStyle = {
      opacity: this.state.opacityVar,
    };
    console.log('opacity: '+navBarStyle.opacity);

    return (
      <>

        <Navbar className={fdHeaderBg} style={navBarStyle} collapseOnSelect expand="sm" 
          bg={bgDefault}
          variant={variantSelect}
          sticky="top">
          <div className={fdHeaderContent}>
            <Navbar.Brand className="fd-header-logo" href="/example2">
              <img className="fd-header-logo-img" src={srcLogoImage}
              width="151px"
                height="33px"
                className="d-inline-block align-center"
                alt="AAA Example2"/>
            </Navbar.Brand>
            <Navbar.Toggle className="fd-header-toggle" aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="fd-header-nav mr-auto justify-content-end">
                <Nav.Link style={navLinkStyle} href="/pppppp"><FormattedMessage id="fd_header_pppppp"/></Nav.Link>
                <Nav.Link style={navLinkStyle} href="/dddddd"><FormattedMessage id="fd_header_dddddd"/></Nav.Link>
                <Nav.Link style={navLinkStyle} href="###" onClick={this.switchLocale}>
                  {/* <img className="fd-header-language-icon" src={languageSwitchIcon}
                    width="18px"
                    height="18px"
                    alt="language switch"/> */}
                  <FormattedMessage id="fd_header_language"/>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>

      </>
    );
  }
}

function mapStateToProps(state){
  return{
    lang: state.locale.lang
  };
}
export default connect(mapStateToProps, {setLocale})(Example2Header);
