import React, { Component } from "react";
import md5 from "js-md5";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/Search Box/searchbox.component.jsx";
//import logo from "./logo.svg";
import "./App.css";
// http(s)://gateway.marvel.com/v1/public/characters/apikey=fb4c0d8362cd8532f8f23c2bb5eba7f3

class App extends Component {
  constructor() {
    super();
    this.state = {
      mystr: "Marvel Heroes",
      results: [],
      searchField: "",
      hero: [
        {
          name: "Doctor Strange",
          id: "0",
        },
        {
          name: "Spider-Man",
          id: "1",
        },
        {
          name: "Loki",
          id: "2",
        },
        {
          name: "Thor",
          id: "3",
        },
        {
          name: "Hulk",
          id: "4",
        },
        {
          name: "Iron Man",
          id: "5",
        },
        {
          name: "Black Panther",
          id: "6",
        },
        {
          name: "Vision",
          id: "7",
        },
        {
          name: "Groot",
          id: "8",
        },
        {
          name: "Captain America",
          id: "9",
        },
        {
          name: "Black Widow",
          id: "10",
        },
        {
          name: "Hawkeye",
          id: "11",
        },
      ],
    };
  }

  async APICall(name) {
    try {
      const PUBLIC_KEY = "fb4c0d8362cd8532f8f23c2bb5eba7f3";
      const PRIVATE_KEY = "1c2505c8ec1c7e65884333bdfb4e5193f2bbf55b";
      const ts = Number(new Date());
      const hash = md5.create();
      hash.update(ts + PRIVATE_KEY + PUBLIC_KEY);
      const res = await fetch(
        ` http://gateway.marvel.com/v1/public/characters?name=${name}&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`
      );
      if (!res.ok) throw new Error(res.status);
      //console.log(`Response `, res);
      const data = await res.json();
      const [character] = data.data.results;
      //console.log("From API-Fetch", character);
      return character;
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidMount() {
    try {
      //console.log(hash.hex());
      const temp = [];
      this.state.hero.forEach((hero) => {
        this.APICall(hero.name).then((data) => {
          temp.push(data);
          this.setState({ results: temp });
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };
  render() {
    //Filter results according to the user input in Textbox
    const { searchField, results } = this.state;
    const filteredHeroes = results.filter((hero) =>
      hero.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1>MARVEL HEROES</h1>
        {/* SearchBox functional component */}
        <SearchBox
          placeholder="Search Hero"
          handleChange={this.handleChange}
          //setState is asynchronous, therefore, to perform task after updating state put a call back func in the second argument
        />

        {/* Create Cards using API Result. */}
        <CardList results={filteredHeroes}></CardList>

        {/* If you want to see API Results in console */}
        <button onClick={() => console.log(this.state.results)}>
          SEE API RESULTS IN CONSOLE
        </button>
      </div>
    );
  }
}

export default App;
