import { Routes, Route, Navigate } from "react-router";
import FoncierChain from "./FoncierChain.jsx";
import App from "./App.jsx";
import AppUpdate from "./AppUpdate.jsx";
const RoutesApp = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppUpdate />} />
      </Routes>
    </div>
  );
};

/**
 * const RoutesApp = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <FoncierChain />} />
        <Route path='/new' element={ <App />} />
        <Route path='/update' element={ <AppUpdate />} />
      </Routes>
    </div>
  )
}
 */

export default RoutesApp;
