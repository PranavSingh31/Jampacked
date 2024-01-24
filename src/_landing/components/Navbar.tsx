import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <section className="topbar">
        <div className="flex-between py-4 px-5">
            <Link to="/landing-page" className="flex items-center gap-3">
                <img 
                    src="/assets/images/logo.png"
                    className="w-8 h-auto"
                />
            </Link>
        </div>
    </section>
  )
}
