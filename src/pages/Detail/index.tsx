import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Wrapper } from "../../components";
import {
    onCatched,
    onReturn,
    probability,
    selectcatched,
} from "../../redux/catchedPokemon/reducer";
import { useAppDispatch } from "../../redux/hook";
import { load, selectPokemon } from "../../redux/pokemon/reducer";

interface Props { }

const Detail: React.FC<Props> = (props) => {
    const state = useSelector(selectPokemon);
    const catchedData = useSelector(selectcatched);
    const dispatch = useAppDispatch();
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            dispatch(load(id));
        }
    }, [catchedData.results]);

    const chanceCatched = () => {
        if (probability(0.75)) {
            dispatch(
                onCatched({ name: state.pokemon.name, id: state.pokemon.id.toString() })
            ).then(() => {
                alert("pokemon success catched");
            });
        } else {
            alert("pokemon not catched, try again");
        }
    };

    return (
        <Wrapper title={state.pokemon.name} icon="home">
            <section className="w-full h-5/6">
                <div className="w-full h-full overflow-x-hidden p-4">
                    <div className="w-full h-2/6 bg-gray-200">
                        <img
                            alt={state.pokemon.name}
                            className="w-full h-full object-contain object-center"
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${state.pokemon.id}.png`}
                        />
                    </div>
                    {state.loading ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <span className="font-bold text-lg">loading</span>
                        </div>
                    ) : !state.loading && state.pokemon.name.length === 0 ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <span className="font-bold text-lg">Not Found</span>
                        </div>
                    ) : (
                        <>
                            <div className="w-full h-1/6 flex justify-between items-center">
                                <div className="w-4/12 h-full flex flex-col justify-center items-center">
                                    <h4 className="font-base font-bold">Weight</h4>
                                    <p className="text-2xl font-bold">{state.pokemon.weight}</p>
                                </div>
                                <div className="w-4/12 h-full flex flex-col justify-center items-center">
                                    <h4 className="font-base font-bold">Height</h4>
                                    <p className="text-2xl font-bold">{state.pokemon.height}</p>
                                </div>
                            </div>
                            <div className="w-full h-auto flex flex-col justify-between items-center mt-4">
                                <div>
                                    <h5 className="font-bold text-2xl">Base Stats</h5>
                                </div>
                                {state.pokemon.stats.map((item, index) => (
                                    <>
                                        <div
                                            key={index}
                                            className="h-10 w-full bg-gray-200 flex relative my-2"
                                        >
                                            <div
                                                className="h-full w-0 bg-gray-400 self-end"
                                                style={{ width: `${item.base_stat}%` }}
                                            ></div>
                                            <div className="w-full h-full absolute flex border-2 border-black px-2 items-center">
                                                <span className="font-base font-bold">
                                                    {item.stat.name} {item.base_stat}
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </>
                    )}

                    <div className="w-full h-1/6 flex items-center">
                        {state.catched ? (
                            <button
                                className="w-full h-16 bg-gray-200"
                                onClick={() =>
                                    dispatch(onReturn({ id: state.pokemon.id.toString() }))
                                }
                            >
                                <span>Return</span>
                            </button>
                        ) : (
                            <button
                                className="w-full h-16 bg-gray-200"
                                onClick={chanceCatched}
                            >
                                <span>Catch</span>
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </Wrapper>
    );
};

export default Detail;
