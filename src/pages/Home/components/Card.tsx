
import { Component } from 'react'
import { Link } from 'react-router-dom';
import { NamedAPIResource } from '../../../redux/app';

interface Props {
    item: NamedAPIResource
    index: number
}

interface State {

}

export class Card extends Component<Props, State> {
    render() {
        return (
            <div className="w-full h-20 px-6 border-2">
                <div>
                    <h5 className="font-base font-bold">{this.props.item.name}</h5>
                    <Link to={`/${this.props.item.id}`} >
                        <span className="font-base">Detail</span>
                    </Link>
                </div>
            </div>
        )

    }


}

export default Card
