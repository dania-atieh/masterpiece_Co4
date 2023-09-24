import logo from '../assets/logo-empty.png'

function Loading({ fullHeight = true }) {
  return (
    <div className={`${fullHeight && 'h-screen'} w-full flex justify-center items-center`}>
      <img src={logo} alt="logo" className="w-24 animate-ping" />
    </div>
  )
}

export default Loading
