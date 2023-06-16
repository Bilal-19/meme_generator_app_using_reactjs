import React from "react"

export default function Meme() {

    // Create a state; Meme store the object and setMeme is used to update the object
    // Meme object contain three keys; topText, bottomText and randomImage
    const [meme, setMeme] = React.useState(
        {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg"
        }
    )
    // console.log("Meme", meme)
    /**
        useEffect takes a function as its parameter. If that function
        returns something, it needs to be a cleanup function. Otherwise,
        it should return nothing. If we make it an async function, it
        automatically retuns a promise instead of a function or nothing.
        Therefore, if you want to use async operations inside of useEffect,
        you need to define the function separately inside of the callback
        function, as seen below:
        */

    // allMeme is an object which contain data of "memesData.jsx" file
    const [allMemes, setAllMemes] = React.useState([])
    // console.log("All Memes Object Contain:", allMemes)

    // Creating a useEffect
    // UseEffect takes two parameters
    // 1. callback function
    // 2. Dependency array
    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])

    function getMemeImage() {
        // Generating a random number
        const randomNumber = Math.floor(Math.random() * allMemes.length)

        // Store the url of image into a variable on the basis of random number
        const url = allMemes[randomNumber].url

        // Calling a useState function which:
        // takes 'prevMeme' as a parameter
        // returns the prevMeme and set the url to 'randomImage' 
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))

    }

    function handleChange(event) {
        console.log(event.target)
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}