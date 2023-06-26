const Header = (props) => {

  let listStyle = 'hover:text-green-900'

  return (
    <header className="flex flex-row w-full">
      <ul className="flex flex-row justify-center gap-2 text-green-500 w-full">
        <li className={listStyle}><a href='/'>home</a></li>
        <li className={listStyle}><a href='/pokemon'>PokeAPI</a></li>
        <li className={listStyle}><a href='/newpoke'>PokeAPI New</a></li>
      </ul>
    </header>
  );
}
export default Header;