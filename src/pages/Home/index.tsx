import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import { load } from "../../redux/app/reducer";
import { useAppDispatch } from "../../redux/hook";
import { Wrapper } from "../../components";
import Card from "./components/Card";

interface Props { }

const Home: React.FC<Props> = (props) => {
    const state = useSelector((state: RootState) => {
        return state.app
    }
    );
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(load({ pageNumber: state.pageNumber, limit: state.limit }))
    }, [])

    return (
        <Wrapper title="Pokemons" icon="bookmark">
            <section className="w-full h-5/6">
                <div className="w-full h-5/6 overflow-x-hidden p-4">
                    <div className="w-full h-full">
                        {
                            state.loading ?
                                <div className="w-full h-full flex justify-center items-center"><span className="font-base font-bold">Loading</span></div>
                                :
                                state.results.map((item, index) =>
                                    <Card key={index} item={item} index={index} />
                                )
                        } </div>
                </div>
                <div className="w-full h-1/6 bg-white flex justify-center items-center">
                    <div className="w-4/6 flex justify-between items-center">
                        <button disabled={state.pageNumber === 0} onClick={() => dispatch(load({ pageNumber: state.pageNumber - state.limit, limit: state.limit }))}>
                            <ArrowLeftCircle size={40} />
                        </button>
                        <span className="text-2xl font-bold">{state.pageNumber + 1} - {state.pageNumber + state.limit}</span>
                        <button disabled={state.pageNumber + state.limit >= state.count} onClick={() => dispatch(load({ pageNumber: state.pageNumber + state.limit, limit: state.limit }))}>
                            <ArrowRightCircle size={40} />
                        </button>
                    </div>
                </div>
            </section>
        </Wrapper>
    );
};

export default Home;
