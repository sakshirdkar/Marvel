import md5 from "js-md5";
import Keys from "./config";

export const APICall = async function (name) {
  try {
    const ts = Number(new Date());
    const hash = md5.create();
    hash.update(ts + Keys.PRIVATE_KEY + Keys.PUBLIC_KEY);
    const res = await fetch(
      ` https://gateway.marvel.com/v1/public/characters?name=${name}&ts=${ts}&apikey=${
        Keys.PUBLIC_KEY
      }&hash=${hash.hex()}`
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
};
