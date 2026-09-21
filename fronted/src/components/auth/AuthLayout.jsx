function AuthLayout({children}){
    return (
     <div className="min-h-screen flex"> 
            {/* left side of login and register page */}
        <div className="w-1/2 bg-[#E9E7FF] p-12"> 
        <h1 className = "text-3xl font-bold text-[#6246E5]">
            OneSub
        </h1>
        <div className="mt-20">
        <h2 className="text-5xl font-bold text-[#171717]">
            Track. Manage. Save.
            </h2>
             <p className="mt-4 text-xl text-gray-600">
                 All your subscriptions, one place.
             </p>
             <p className="">Keep track of your subscriptions, manage your spending,
            and never miss a renewal.</p>
        </div>


          {/* Features */}
        <div className="mt-16 space-y-6">

          <div>
            <h3 className="font-semibold text-lg">
              Track Spending
            </h3>
            <p className="text-gray-500">
              Know where your money goes.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Renewal Alerts
            </h3>
            <p className="text-gray-500">
              Never miss a subscription renewal.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Smart Insights
              </h3>
            <p className="text-gray-500">
              Understand your subscription habits.
            </p>
          </div>

        </div>

      </div>
        {/* right side */}
      <div className="w-1/2 flex items-center justify-center p-12">
        {children}
      </div>

    </div>
    );
}

export default AuthLayout;