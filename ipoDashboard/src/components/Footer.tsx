

const Footer = () => {
  return (
    <div>
        <footer className="bg-[#F2F4F8] mt-12 text-gray-700 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">

            <div>
              <h4 className="text-lg font-semibold text-blue-700">BlueStocks</h4>
              <p className="text-sm mt-2">Track upcoming IPOs and market trends with confidence.</p>
            </div>

            <div>
              <h5 className="font-medium mb-2">Products</h5>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:underline">IPO Tracker</a></li>
                <li><a href="#" className="hover:underline">Price Alerts</a></li>
                <li><a href="#" className="hover:underline">Watchlist</a></li>
              </ul>
            </div>

        

            <div>
              <h5 className="font-medium mb-2">Support</h5>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Contact Us</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 py-4 ">
            © {new Date().getFullYear()} BlueStocks. All rights reserved.
          </div>
        </footer>

    </div>
  )
}

export default Footer