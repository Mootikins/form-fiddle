import React from 'react';
import FieldOpt from './FieldOpt';
import MagicFormik from './MagicFormik';

function App() {
	// needs to be a prop when is a solo component
	const parsedOpts: FieldOpt[] = JSON.parse(
		`[
	{
		"type": "text",
		"name": "emailAddress",
		"label": "Email Address"
	},
	{
      "type": "select",
      "name": "favoriteFruit",
      "label": "Favorite Fruit",
      "options": [
        [
          "Apple",
          "apple"
        ],
        [
          "Pear",
          "pear"
        ],
        [
          "Grapes",
          "grapes"
        ],
        [
          "Banana",
          "banana"
        ]
		]
	}
]`
	);

	return (
		<div className="App">
			<MagicFormik fields={parsedOpts} />
		</div>
	);
}

export default App;
