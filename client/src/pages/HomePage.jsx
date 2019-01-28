import React,{Component} from 'react';
import '../components/home-page/Home-page.css';
import { Card, CardText } from 'material-ui/Card';
import Auth from '../utils/Auth';
import Logo from '../components/logo/Logo';
import Search from '../components/search/Search';
import Slider from '../components/slider/Slider';
import Post from '../components/posts/Post-page';
import Footer from '../components/footer/Footer';

class HomePage extends Component {
  /**
   * @description update authenticated state on logout
   */
  componentWillMount() {
   this.props.toggleAuthenticateStatus();
  }

  render() {
    return (
    <div className="home">
        <header className="main-header header-color">
            <Logo/>
            <Search className="main-search"/>
        </header>
        <Slider />
    <Card>
        {Auth.isUserAuthenticated() ? (
          <CardText style={{ fontSize: '16px', color: 'green' }}>Welcome!</CardText>
        ) : (
          <CardText style={{ fontSize: '16px', color: 'red' }}>You are not logged in.</CardText>
        )}
    </Card>
    <Post  toggleAuthenticateStatus={this.props.toggleAuthenticateStatus}/>
   <Footer/>
  </div>)
  }
};

export default HomePage;
