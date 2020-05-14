import React, { useEffect } from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import Header from "./Header";
import TaskList from "./TaskList";

function App() {
  const location = useLocation();
  const history = useHistory();


  useEffect(() => {
    if (location.pathname === "/") {
      history.push("/task-manager");
    }
  }, [history,location.pathname]);


  return (
    <div>
      <Header />
      <Switch>
        <Route path="/task-manager" exact component={TaskList} />
      </Switch>
    </div>
  );
}

export default App;
