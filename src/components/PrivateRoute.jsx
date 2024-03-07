import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { useAuth } from './path/to/your/auth/context'; // 認証状態を管理するコンテキスト

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const { currentUser } = useAuth(); // 認証状態を取得

  // return (
    // <Route
      // {...rest}
      // render={props =>
      //   currentUser ? (
      //     <Component {...props} />
      //   ) : (
          // <Redirect to="/login" />
    //     )
    //   }
    // />
  // );
};

export default PrivateRoute;