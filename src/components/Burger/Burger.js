import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient.js';
import classes from './Burger.css';

const burger = (props) => {
	let transformatedIngredients = Object.keys(props.ingredients)
		.map(igKey => {
			return [...Array(props.ingredients[igKey])].map((_, i) => {
				return <BurgerIngredient key={igKey + i} type={igKey}/>;
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el)
		}, []);

	console.log(transformatedIngredients);
	if (transformatedIngredients.length === 0){
		transformatedIngredients = <p>Please start adding ingredients.</p>
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top"/>
			{transformatedIngredients}
			<BurgerIngredient type="bread-bottom"/>
		</div>
	);
};

export default burger;
