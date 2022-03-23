import { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import s from "./currency.module.css";

export const App = () => {
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    async function apiCurs() {
      try {
        const url = "https://www.cbr-xml-daily.ru/daily_json.js";
        const response = await fetch(url);
        const data = await response.json();
        const dataArr = Object.values(data.Valute);
        const dataNewArr = dataArr.map((todo) => ({
          ...todo,
          checked: false,
        }));
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

  return (
    <div className={s.currency__container}>
      <ul className={s.currency__title}>
        <li>Код валюты</li>
        <li>Значение в рублях</li>
        <li>Разница(%) с предыдущим днём</li>
      </ul>
      {currency.map((elem, index) => (
        <ul className={s.currency__list} key={index}>
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
