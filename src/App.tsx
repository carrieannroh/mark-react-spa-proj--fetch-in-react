import { useState } from "react";

interface Dog {
  // id: number;
  // type: string;
  // setup: string;
  // punchline: string;

  message: string; //"https://images.dog.ceo/breeds/hound-afghan/n02088094_6690.jpg",
  status: string;
}

function App() {
  const [photo, setPhoto] = useState<Dog>();
  const [favouriteDog, setFavouriteDog] = useState<Dog[]>([]);

  const handleGetJoke = async () => {
    const response = await fetch(
      "https://dog.ceo/api/breed/shiba/images/random" //follow the link to see what type it is
    );
    const jsonBody: Dog = await response.json(); //you await the response you defined on 18, then it is assigned to the jsonbody with type dog
    setPhoto(jsonBody);
  };


  const handleStoreDog = () => {
    if (typeof photo !== "undefined") { //will only trigger if photo has some kind of content in it
      setFavouriteDog([...favouriteDog, photo])
    }
  };

  //console.log(handleStoreDog()); //console logging the function means you execute the funcion every time the component is shown


  const handleReset = () => {
    setFavouriteDog([])
  }

  // const handleGetJoke = () => {
  //   fetch("https://official-joke-api.appspot.com/jokes/general/random")
  //     .then((response) => response.json())
  //     .then((jsonBody: Joke[]) => setJoke(jsonBody[0]));
  // };

  if (photo) {
    return (
      <div>
        <h1>Doggo app</h1>
        <img src={photo.message} alt="dog pic" /> //this references the useState, .message is the key
        <details>
          <summary>Your fave dog pics</summary>
          <p>
            {/* //dogObjectOfArray is of type dog bcz it is an element of faveouriteDog[] . DogObjectOfArray = think of it as a parameter representative of each element you iterate over, then you transform it with what comes after the =>*/}
            Stored images: {favouriteDog.map((DogObjectOfArray) => <img src={DogObjectOfArray.message} alt="" />)};
            {/* //everything after the arrow function = this is transforming each element into an image. you do the element transformation in the .map function callback  */}
          </p>
        </details>
        {/* <details> */}
        {/* <summary>{joke.setup}</summary>
          <p>{joke.punchline}</p> */}
        {/* </details> */}
        <hr />
        <button onClick={handleGetJoke}>New doge pic</button>
        <button onClick={handleStoreDog}>Add to Faves</button>
        <button onClick={handleReset}>Reset</button>


      </div>
    );
  } else {
    return (
      <div>
        <h1>Shiba Pics</h1>
        <p>
          Click the button to trigger a <code>fetch</code> to get a wholesome Shiba pic!
        </p>
        <button onClick={handleGetJoke}>Get shibe</button>
      </div>
    );
  }
}

export default App;
