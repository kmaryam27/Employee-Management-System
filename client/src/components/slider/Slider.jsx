import React, { Component } from 'react';
import './Slider.css';
import ReactTimeout from 'react-timeout';

import logo from '../../assets/img/logo/logo-2.png';
import p1 from '../../assets/img/slider/kabab.jpg';
import p2 from '../../assets/img/slider/shirini.jpg';
import p3 from '../../assets/img/slider/kb.jpg';
import p4 from '../../assets/img/slider/bastani.jpg';
import p5 from '../../assets/img/slider/bal.jpg';
import p6 from '../../assets/img/slider/cake.jpg';
import p7 from '../../assets/img/slider/chai.jpg';
import p8 from '../../assets/img/slider/giyahi.jpg';
import p9 from '../../assets/img/slider/dande.jpg';
import p10 from '../../assets/img/slider/cake2.jpg';
import p11 from '../../assets/img/slider/falafel.jpg';
import p12 from '../../assets/img/slider/jooj.jpg';

const LeftArrow = (props) => {
    return (
      <div className="back-arrow" onClick={props.goToPrevSlide}>
        <i className="fas fa-angle-left fa-2x"></i>
      </div>
    );
  }

const RightArrow = (props) => {
    return (
      <div className="next-arrow" onClick={props.goToNextSlide}>
        <i className="fas fa-angle-right fa-2x"></i>
      </div>
    );
  }

const SliderImg = props => (
    <div id="slideshow">
        <div className="slider-img fade"  id="s1">
            <form id='slider_form'>
                <div className="slider_header">
                    <button className="left_side button_slider pointer">Hotels Restaurants Coffee shops....</button> 
                    <img id="slider_logo" alt="logo" className="right_side" src={logo}/>
                </div>
            
                <div>
                    <a href="/">
                        <button id="btn1" className="left_side plus_btn pointer" aria-hidden="true"><i className="fa fa-plus"></i></button>
                        <label id="lbl1" className="slides left_side pointer">Setting up Restaurants</label>
                    </a>
                    <a href="/">
                        <button id="btn1_1" className="right_side plus_btn pointer" aria-hidden="true"><i className="fa fa-plus"></i></button>
                        <label id="lbl1_1" className="right_side  slides pointer right_side">Setting up Hotels</label>
                    </a>
                </div>
                <div>
                    <a href="/">
                        <button id="btn2" className="left_side plus_btn pointer" aria-hidden="true"><i className="fa fa-plus"></i></button>
                        <label id="lbl2" className="slides left_side pointer">Setting up FastFoods</label>
                    </a>
                    <a href="/">
                        <button id="btn1_2" className="right_side  plus_btn  pointer" aria-hidden="true"><i className="fa fa-plus"></i></button>
                        <label id="lbl2_2" className="right_side  slides pointer right_side">Setting up Cofee Shops</label>
                    </a>
                </div>
                <div>
                    <a href="/">
                        <button id="btn3" className="left_side plus_btn pointer" aria-hidden="true"><i className="fa fa-plus"></i></button>
                        <label id="lbl3" className="slides left_side pointer">International food academy</label>
                    </a>
                    <a href="/">
                        <button id="btn3_3" className="right_side  plus_btn  pointer" aria-hidden="true"><i className="fa fa-plus"></i></button>
                        <label id="lbl3_3" className="right_side  slides pointer">Consultation services</label>
                    </a>
                </div>
            </form> 
        </div>

        <div id="m2" className=" slider-img fade">
            <label id="lbl4" className="slides">Persian menu</label> 
            <div>
            <a href="/"><img alt="Persian Foods" className='slider-pic img-effect1' src={p1}/></a>
            <a href="/"><img alt="Persian Foods" className='slider-pic img-effect2' src={p2}/></a>
            <a href="/"><img alt="Persian Foods" className='slider-pic img-effect3' src={p3}/></a>
            <a href="/"><img alt="Persian Foods" className='slider-pic img-effect1' src={p4}/></a>
            <a href="/"><img alt="Persian Foods" className='slider-pic img-effect2' src={p5}/></a>
            <a href="/"><img alt="Persian Foods" className='slider-pic img-effect3' src={p6}/></a>
            </div>
            <div>
            <a href="/"><img alt="Persian Foods" className='slider-pic img-effect3' src={p7}/></a>
            <a href="/"><img alt="Persian Foods" className='slider-pic img-effect2' src={p8}/></a>
            <a href="/"><img alt="Persian Foods" className='slider-pic img-effect1' src={p9}/></a>
            <a href="/"><img alt="Persian Foods" className='slider-pic img-effect3' src={p10}/></a>
            <a href="/"><img alt="Persian Foods" className='slider-pic img-effect2' src={p11}/></a>
            <a href="/"><img alt="Persian Foods" className='slider-pic img-effect1' src={p12}/></a>
            </div>
        </div>
        <LeftArrow goToPrevSlide={props.goToPrevSlide}/>
        <RightArrow goToNextSlide={props.goToNextSlide}/>
        <div>
            <span className="dot"></span> 
            <span className="dot"></span> 
            <span className="dot"></span> 
        </div>

</div>

)
var slideIndex = 0;
class Slider extends Component {
    
    componentDidMount(){
        this.showSlides(); 
    }

    goToNextSlide(){
      var slides = document.getElementsByClassName("slider-img");
      var dots = document.getElementsByClassName("dot");
      if ( slides.length > 0){ 
        for (let i = 0; i < slides.length; i++) {
            if(slides[i].style.display === "block"){
                slides[i].style.display = "none";
                dots[i].className = dots[i].className.replace(" active", "");
                slides[i + 1].style.display = "block";  
                dots[i + 1].className += " active"; 
                }
            }
        }
    }

    goToPrevSlide(){
        var slides = document.getElementsByClassName("slider-img");
        var dots = document.getElementsByClassName("dot");
        if ( slides.length > 0){ 
            for (let i = 0; i < slides.length; i++) {
                if(slides[i].style.display === "block"){
                    slides[i].style.display = "none";
                    dots[i].className = dots[i].className.replace(" active", "");
                    slides[i - 1].style.display = "block";  
                    dots[i - 1].className += " active"; 
                }
            }
        }
    }

    showSlides() {
      var i;
      var slides = document.getElementsByClassName("slider-img");
      var dots = document.getElementsByClassName("dot");
      if ( slides.length > 0){ 
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        (slideIndex === slides.length + 1)?slideIndex = 1:console.log('');  
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[slideIndex-1].style.display = "block";  
          dots[slideIndex-1].className += " active"; 
            setInterval(this.showSlides,10000)
        }
    }

    render() {
      return (
        <div className="slider_div">
            <SliderImg goToNextSlide={this.goToNextSlide} goToPrevSlide={this.goToPrevSlide}/>      
        </div>
      );
    }
  }

export default ReactTimeout(Slider);