import { Component } from 'react'
import { Bookmark, Home } from 'react-feather'
import { Link } from 'react-router-dom';

interface Props {
    title: string,
    icon: string
}

interface State {

}

export class Wrapper extends Component<Props, State> {

    render() {
        return (
            <main className="w-screen h-screen flex flex-col justify-between relative">
                <nav className="w-full h-20 flex p-4 justify-between sticky top-0 bg-white shadow-lg">
                    <div className="w-5/12 h-full flex items-center">
                        <h1 className="text-xl font-sans font-bold">{this.props.title.toUpperCase()}</h1>
                    </div>
                    <div className="w-3/12 h-full flex justify-end items-center">
                        {
                            this.props.icon === "bookmark"
                                ?
                                <Link to="/my-pokemon">
                                    <Bookmark />
                                </Link>
                                : this.props.icon === "home" && <Link to="/">
                                    <Home />
                                </Link>}
                    </div>
                </nav>
                {this.props.children}
                <footer className="w-full h-20 bg-white flex justify-center items-center">
                    <h3>copyright @ 2021</h3>
                </footer>
            </main>
        )

    }


}

export default Wrapper
