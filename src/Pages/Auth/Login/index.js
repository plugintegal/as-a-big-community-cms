import React from "react";
import LoginComponent from '../../../Components/Auth/Login/';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

const Login = () => {
  const {user: currentUser} = useSelector((state) => state.auth);
  console.log(" Login Page ", currentUser);

  if(currentUser !== null){
    return (<Redirect to="/" />)
  }

  return (
    <section class="bg-blue-600 text-gray-600 body-font flex items-center">
      <div class="container px-5 py-24 mx-auto flex flex-wrap items-center h-screen">
        <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 class="title-font font-medium text-3xl text-white">
            PLUG-IN
          </h1>
          <p class="leading-relaxed mt-4 text-white">
            Passionate - Learning - Unity - Global - Innovate - Nationality
          </p>
        </div>
        <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <LoginComponent />
        </div>
      </div>
    </section>
  );
};

export default Login;
