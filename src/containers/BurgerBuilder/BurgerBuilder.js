import React, { Component } from 'react';
import Aux from '../../hoc/Aux.js';
import Burger from '../../components/Burger/Burger.js';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js';
import Modal from '../../components/UI/Modal/Modal.js';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.js';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4, // base price
		purchaseable: false, // does the burger have at least 1 ingredient?
		purchasing: false // has the order button been clicked?
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;

		const oldPrice = this.state.totalPrice;
		const priceAddition = INGREDIENT_PRICES[type];
		const newPrice = oldPrice + priceAddition;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients
		});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <=0){
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;

		const oldPrice = this.state.totalPrice;
		const priceAddition = INGREDIENT_PRICES[type];
		const newPrice = oldPrice - priceAddition;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients
		});
		this.updatePurchaseState(updatedIngredients);
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey =>{
				return ingredients[igKey]
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		this.setState({purchaseable: sum > 0});
	}

	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	purchaseCancelledHandler = () => {
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = () => {
		alert("Let's eat!");
	}

	render(){

		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		return (
			<Aux>
				<Modal
				show={this.state.purchasing}
				modalClosed={this.purchaseCancelledHandler}>
					<OrderSummary
					ingredients={this.state.ingredients}
					purchaseContinue={this.purchaseContinueHandler}
					purchaseCancel={this.purchaseCancelledHandler}
					price={this.state.totalPrice}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchaseable={this.state.purchaseable}
					ordered={this.purchaseHandler}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
