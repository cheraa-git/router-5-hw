import { NavLink, Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
      <h1>Home page</h1>
      <NavLink to="/users">Users list</NavLink>
    </>
  )
}

const UsersListPage = () => {
  const { path } = useRouteMatch()
  return (
    <>
      <h1>Users list page</h1>
      <NavLink to="/">Home</NavLink>
      <ul>
        {new Array(5).fill('').map((_, i) => (
          <li key={i}>
            <NavLink to={`${path}/${i}`}>User {i}</NavLink>
          </li>
        ))}
      </ul>
    </>
  )
}

const UserProfilePage = () => {
  const { userId } = useParams()
  return (
    <>
      <h1>User profile page</h1>
      <NavLink to="/users">Users list</NavLink>
      <p>userId: {userId}</p>
      <NavLink to={`/users/${userId}/edit`}>edit</NavLink>
    </>
  )
}

const UserEditPage = () => {
  const { userId } = useParams()
  const randomId = Math.floor(Math.random() * 100)
  return (
    <>
      <h1>User edit page</h1>
      <ul>
        <li>
          <NavLink to={`/users/${userId}/profile`}>go to user</NavLink>
        </li>
        <li>
          <NavLink to={`/users/${randomId}/profile`}>go to another user</NavLink>
        </li>
        <li>
          <NavLink to="/users">Users list page</NavLink>
        </li>
      </ul>
    </>
  )
}


const UsersLayout = () => {
  const { path } = useRouteMatch()
  return (
    <>
      <h1>Users layout</h1>
      <Switch>
        <Route path={path} exact component={UsersListPage}/>
        <Route path={path + '/:userId/profile'} component={UserProfilePage}/>
        <Route path={path + '/:userId/edit'} component={UserEditPage}/>
        <Redirect from={path + '/:userId'} to={path + '/:userId/profile'}/>
      </Switch>
    </>

  )
}

function App() {
  return (
    <div>
      <h1>App layout</h1>
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/users" component={UsersLayout}/>
        <Redirect to="/"/>
      </Switch>
    </div>
  )
}

export default App;
