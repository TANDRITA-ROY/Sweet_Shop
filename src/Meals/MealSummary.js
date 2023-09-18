import React from "react";
import classes from "./MealsSummary.module.css";

const MealSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Delicious Desserts, Delivered To You</h2>
      <p>
        Choose your favorite Sweet from our broad selection of available Sweets
        and enjoy a delicious dessert at home.
      </p>
      <p>
        All our Sweet are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
    </section>
  );
};

export default MealSummary;
