// =================================================================
// Program: Example1.js - the example1 page in the xxxxxx website 
// Author : Bill Huang
// Date   : Oct 19 - Dec 18, 2019
// =================================================================

import React, { Component } from 'react';
import { FormattedMessage  } from 'react-intl';
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';

import Header from './Header';
import Footer from './Footer';

import './Example1.css';

class Example1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        callerName: 'example1',
        isLoading: true,
        example1Data: [],
        showItems: 6,
        totalItems: 0
    };
    this.handleShowMore = this.handleShowMore.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});
    fetch(`/example1/view`)
      .then(response => response.json())
      .then(data => this.setState({example1Data: data, isLoading: false, totalItems: data.length}));
  }  

  handleShowMore() {
    this.setState({
      showItems: 
        this.state.showItems >= this.state.totalItems ?
          this.state.totalItems : this.state.showItems + 6
    })
  }

render() {

  const {lang} = this.props;
  const {example1Data, isLoading, showItems, totalItems} = this.state;

  return (
      <>
        <Header callerName={this.state.callerName}/>    
        <div className="ft-example1-bg"> 
            <div className="ft-example1-content">

              <div className='ft-example1-header'>
                <div className='ft-example1-title'><FormattedMessage id="ft_example1_title"/></div>
                <div className='ft-example1-contact'><FormattedMessage id="ft_example1_contact"/></div>
              </div>

              <div className='ft-example1-group'>
                  {example1Data.slice(0,showItems).map((ft,index) => (
                    <div className='ft-example1-card-bg' key={index}>
                    <Link to={`/example1/details/${ft.id}`} key={ft.id}>
                        <div className="ft-example1-card">
                            <div className='ft-example1-card-img-div'>
                                <div dangerouslySetInnerHTML={{__html: ft.cover}}></div>
                            </div>
                            <div className="ft-example1-card-body">
                                <h1 className="ft-example1-card-title" key={ft.id}>
                                    {ft.title}
                                </h1>
                                <h2 className='ft-example1-card-timestamp' key={ft.id}>
                                    {ft.date}
                                </h2>
                                <p className='ft-example1-card-text'> 
                                    <div dangerouslySetInnerHTML={{__html: ft.content}}></div>
                                </p>
                            </div>
                        </div>
                        <div/>
                    </Link>
                  </div>
                ))}
              </div>

              { showItems < totalItems ?
                <div className='ft-example1-view-more'>
                  <div className='ft-example1-view-more-display'>
                    <hr className='ft-example1-view-more-decoration-line' />
                    <button className='ft-example1-view-more-button' onClick={this.handleShowMore}>
                        <FormattedMessage id="ft_example1_viewmore"/>
                    </button>
                    <hr className='ft-example1-view-more-decoration-line' />
                  </div>
                </div>:null
              }

            </div>
          </div>
        <Footer/>
      </>
    );
  }
}

function mapStateToProps(state){
  return{
    lang: state.locale.lang,
  };
}

export default connect(mapStateToProps)(Example1);
