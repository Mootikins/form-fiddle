import { Field } from 'formik';
import React from 'react';
import { FieldState } from './FieldOpt';

interface DynamicSelectProps {
	values: FieldState[];
	name: string;
}

const DynamicSelect: React.FC<DynamicSelectProps> = (props) => {
	return (
		<Field name={props.name} as="select">
			<option value="placeholder" disabled>
				Select a Filter
			</option>

			{/* Make the select for the available fields */}
			{props.values.map((fState, index) => (
				<option
					key={fState.opts.name}
					value={index}
					disabled={fState.selected ? true : false}
				>
					{fState.opts.label}
				</option>
			))}
		</Field>
	);
};

export default DynamicSelect;
