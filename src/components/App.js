// Description: This is the main component of the application. It is the parent component of all other components. 

import ProjectRoutes from "./ProjectRoutes";
import Navigation from "./Navigation";
import AuthProvider from "../contexts/AuthContext";


function App() {
  return (
    <>
      <AuthProvider>
        <Navigation />
        <ProjectRoutes />
      </AuthProvider>

    </>
  );
}

export default App;
