import { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import s from "./currency.module.css";

export const App = () => {
  const [currency, setCurrency] = useState([]);
  const [lastCurrency, setLastCurrency] = useState(false);

  useEffect(() => {
    async function apiCurs() {
      try {
        const url = "https://www.cbr-xml-daily.ru/daily_json.js";
        const response = await fetch(url);
        const data = await response.json();
        const dataArr = Object.values(data.Valute);
        setCurrency(dataArr);
      } catch (e) {
        console.log(e);
      }
    }
    apiCurs();
  }, []);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  // function addString(name) {
  //   const newString = currency.concat(); // копия массива
  //   // const newString = currency.filter((elem) => elem.ID === ID);
  //   const secondString = newString.find((elem) => elem.Name === name);
  //   // secondString.marked = true;
  //   setCurrency(secondString);
  // }

  return (
    <div className={s.currency__container}>
      <ul className={s.currency__title}>
        <li>Код валюты</li>
        <li>Значение в рублях</li>
        <li>Разница(%) с предыдущим днём</li>
      </ul>
      {currency.map((elem, index) => (
        <ul
          // onClick={(index) => setLastCurrency(!lastCurrency)}
          // onClick={() => addString(elem.Name)}
          className={s.currency__list}
          key={index}
        >
          {lastCurrency && <li>{elem.CharCode}</li>}
          <li data-tip={elem.Name} data-for="test" className={s.currency__item}>
            {elem.CharCode}
          </li>
          <li>{elem.Value}</li>
          <li>
            {elem.Value > elem.Previous
              ? "+" + ((elem.Value / elem.Previous - 1) * 100).toFixed(2) + " ▲"
              : "-" +
                ((elem.Previous / elem.Value - 1) * 100).toFixed(2) +
                " ▼"}
          </li>
        </ul>
      ))}
      <ReactTooltip id="test" />
    </div>
  );
};
