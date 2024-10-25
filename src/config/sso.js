//sso.js
export const sso = new SSO("TPE");

//Định nghĩa router cho trang callback
export const router = createBrowserRouter([
  {
    path: callBackUrl,
    element: <CallBackHandler/>,
  },
]);
