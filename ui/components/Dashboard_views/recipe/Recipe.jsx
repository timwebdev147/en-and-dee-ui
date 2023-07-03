import { useEffect, useState } from 'react';
import styles from './recipe.module.scss'
import axios from 'axios';

function Recipe(params) {

    const fields = [
        {
            label: 'allergies',
            details: 'A comma-separated list of allergens or ingredients that must be excluded.',
            name: '',
            placeholder: 'shellfish, olives, lactose....',
            value: ''
        },
        {
            label: 'Diet type',
            details: 'Enter a diet that the meal plan has to adhere to, e.g. "vegetarian", "vegan", "paleo" etc.',
            name: '',
            placeholder: 'vegetarian',
            value: ''
        },
        {
            label: 'target calories',
            details: 'What is the caloric target for one day? The meal plan generator will try to get as close as possible to that goal.',
            name: '',
            placeholder: '2000',
            value: ''
        },
        {
            label: 'Time Frame',
            details: "Either for one 'day' or an entire 'week'.",
            name: '',
            placeholder: 'day',
            value: ''
        },
    ]

    const [formFields, setFormFields] = useState(fields)
    function updateFields(value, index) {
        let clonedFields = [...formFields]
        clonedFields[index].value = value
        setFormFields(clonedFields)
    }


    const generateRecipe = async () => {

const options = {
  method: 'GET',
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate',
  params: {
    exclude: 'shellfish, olives',
    diet: 'vegetarian',
    targetCalories: '2000',
    timeFrame: 'day'
  },
  headers: {
    'X-RapidAPI-Key': 'c5381454efmsh3974a8505c872d7p1ef296jsn60d770abb38a',
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
    
    }


    useEffect(() => {
        generateRecipe()
    }, [])
    
    return(

        <>
        <div className={styles.mainDiv}>
            <div className={styles.sideForm}>
                <h1>Welcome to Diet Bar's Recipe Generator</h1>

                <form>
                    {
                        formFields.map((field, index) => (
                            <div>
                                <label htmlFor="">{field.label}</label>
                                <div>
                                    <input placeholder={field.placeholder} onChange={event => updateFields(event.target.value, index)} type="text" />
                                    <span>{field.details}</span>
                                </div>
                            </div>
                        ))
                    }
                    <button>get your recipe</button>
                </form>
            </div>
            <div className={styles.recipeDisplay}>

            </div>
        </div>
        </>
    )
}

export default Recipe;