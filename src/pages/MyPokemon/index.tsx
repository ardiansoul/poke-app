import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Wrapper } from "../../components";
import { load } from "../../redux/catchedPokemon/reducer";
import { useAppDispatch } from "../../redux/hook";
import { RootState } from "../../redux/store";
import Card from "../Home/components/Card";

interface Props { }

const MyPokemon: React.FC<Props> = (props) => {
    const state = useSelector((state: RootState) => {
        return state.catchedPokemon;
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(load());
    }, []);

    return (
        <Wrapper title="My Pokemon" icon="home">
            <section className="w-full h-5/6">
                <div className="w-full h-5/6 overflow-x-hidden p-4">
                    <div className="w-full h-full">
                        {state.loading ? (
                            <div className="w-full h-full flex justify-center items-center">
                                <span className="font-bold text-lg">loading</span>
                            </div>
                        ) : !state.loading && state.results.length === 0 ? (
                            <div className="w-full h-full flex justify-center items-center">
                                <span className="font-bold text-lg">
                                    You haven't got pokemon
                                </span>
                            </div>
                        ) : (
                            state.results.map((item, index) => (
                                <Card key={index} item={item} index={index} />
                            ))
                        )}
                    </div>
                </div>
            </section>
        </Wrapper>
    );
};

export default MyPokemon;
