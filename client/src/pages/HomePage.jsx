import React,{Component} from 'react';
// import '../components/home-page/Home-page.css';
// import { Card, CardText } from 'material-ui/Card';
// import Auth from '../utils/Auth';
// import Header from '../components/Header/Header';
// import Slider from '../components/slider/Slider';
// import News from './NewsPage';
// import Footer from '../components/footer/Footer';

class HomePage extends Component {
  /**
   * @description update authenticated state on logout
   */
  componentWillMount() {
   this.props.toggleAuthenticateStatus();
  }

  render() {
    return (
    <div className="home">Home
      {/* <Header/> */}
    {/* <Slider />
    <Card>
        {Auth.isUserAuthenticated() ? (
          <CardText style={{ fontSize: '16px', color: 'green' }}>Welcome!</CardText>
        ) : (
          <CardText style={{ fontSize: '16px', color: 'red' }}>You are not logged in.</CardText>
        )}
    </Card>
      <News  toggleAuthenticateStatus={this.props.toggleAuthenticateStatus}/>
    <Footer/> */}
  </div>)
  }
};

export default HomePage;
