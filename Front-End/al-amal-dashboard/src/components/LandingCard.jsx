import logo from '../assets/logo.png'

function LandingCard() {
  return (
    <div className="flex bg-white px-4 py-8 rounded-xl justify-between">
      <div>
        <p className='text-xl font-semibold leading-7 text-gray-500'>Hello, And very welcome! 🎉</p>
        <p className='text-xl font-semibold leading-7 text-gray-500'>
          You have made it into the Dashboard.
          <br /> Now You Take the lead. 🤩
        </p>
      </div>
      <div>
        <img src={logo} />
      </div>
    </div>
  )
}

export default LandingCard
