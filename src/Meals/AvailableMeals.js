import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const DUMMY_MEALS = [
  //   {
  //     id: "m1",
  //     name: "Sushi",
  //     description: "Finest fish and veggies",
  //     price: 22.99,
  //     qty: "Pcs",
  //   },
  //   {
  //     id: "m2",
  //     name: "Schnitzel",
  //     description: "A german specialty!",
  //     price: 16.5,
  //     qty: "Pcs",
  //   },
  //   {
  //     id: "m3",
  //     name: "Barbecue Burger",
  //     description: "American, raw, meaty",
  //     price: 12.99,
  //     qty: "Kg",
  //   },
  //   {
  //     id: "m4",
  //     name: "Green Bowl",
  //     description: "Healthy...and green...",
  //     price: 18.99,
  //     qty: "Pcs",
  //   },
  // ];

  useEffect(() => {
    const featchMeals = async () => {
      const res = await fetch(
        "https://full-stack-sweet-hop-may-2023-default-rtdb.firebaseio.com/meals.json"
      );
      const data = await res.json();
      const meals_array = [];
      for (const key in data) {
        meals_array.push({
          id: key,
          name: data[key].name,
          des: data[key].description,
          price: data[key].price,
          qty: data[key].qty,
        });
      }
      setMeals(meals_array);
      setIsLoading(false);
    };
    featchMeals();
  }, []);

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && (
          <section>
            <h3 className={classes.p}>Loading Taste...</h3>
          </section>
        )}
        {!isLoading && (
          <ul>
            {meals.map((meal) => (
              <MealItem
                id={meal.id}
                key={meal.id}
                name={meal.name}
                des={meal.des}
                price={meal.price}
                qty={meal.qty}
              />
            ))}
          </ul>
        )}
      </Card>
    </section>
  );
};

export default AvailableMeals;
