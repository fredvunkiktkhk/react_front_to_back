import React, {useState, useEffect} from 'react';
import Board from '../Game/Board';
import initializeDeck from '../Game/Deck';

export default () => {

    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [dimension, setDimension] = useState(400);
    const [solved, setSolved] = useState([]);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        resizeBoard();
        setCards(initializeDeck());
    }, []);

    // useEffect(() => {
    //     preloadImages()
    // }, cards);

    useEffect(() => {
        const resizeListener = window.addEventListener('resize', resizeBoard);

        return () => window.removeEventListener('resize', resizeListener)
    });

    const handleClick = (id) => {
        setDisabled(true);
        if (flipped.length === 0) {
            setFlipped([id]);
            setDisabled(false);
        } else {
            if (sameCardClicked(id)){
                setDisabled(false);
                return;
            }
            setFlipped([flipped[0], id]);
            if (isMatch(id)) {
                setSolved([...solved, flipped[0], id]);
                resetCards()
            } else {
                setTimeout(resetCards, 1000)
            }
        }
    };

    // const preloadImages = () => {
    //     cards.map((card) => {
    //         const src = `/img/${card.type}.png`;
    //         new Image().src = src
    //     })
    // };

    const resetCards = () => {
        setFlipped([]);
        setDisabled(false)
    };
    const sameCardClicked = (id) => flipped.includes(id);

    const isMatch = (id) => {
        const clickedCard = cards.find(card => card.id === id);
        const flippedCard = cards.find(card => flipped[0] === card.id);
        return flippedCard.type === clickedCard.type
    };

    const resizeBoard = () => {
        setDimension(Math.min(
            document.documentElement.clientWidth,
            document.documentElement.clientHeight
        ),)
    };

    return (
        <main style={{marginTop: '63px'}}>
            <div className="content" style={{minHeight: '100%'}}>
                <h1>Mäng</h1>
                <h3> Leia õige paariline</h3>

                <div>
                    <Board
                        dimension={dimension}
                        cards={cards}
                        flipped={flipped}
                        handleClick={handleClick}
                        disabled={disabled}
                        solved={solved}
                    />
                </div>
            </div>
        </main>
    )
}