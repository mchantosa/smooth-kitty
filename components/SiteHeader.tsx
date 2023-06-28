interface HeadProps {
  loggedIn?: boolean;
}

export default function Header(props: HeadProps) {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">
          {/* TODO: Logo */}
          Welcome to Connections
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            {props.loggedIn ? (
              <a href="/logout">Logout</a>
            ) : (
              <a href="/login">Login</a>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
