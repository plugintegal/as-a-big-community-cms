import React, { Component } from "react";
import { BiMenu } from 'react-icons/bi';

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <header className="text-gray-600 body-font">
          <div className="container flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a className="flex title-font font-medium items-center text-xl text-gray-900 mb-4 md:mb-0">
              <BiMenu className="" style={{ fontSize : 30, fontColor: '#e9e9e9' }}/>
            </a>
            <nav className="ml-auto flex flex-wrap items-center text-base justify-center">
              <img class="h-12 rounded-full" src="http://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" alt="James Bhatta"/>
            </nav>
            
          </div>
        </header>
    );
  }
}

export default HeaderComponent;
