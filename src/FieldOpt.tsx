import React from 'react';
import { Field } from 'formik';

interface FieldOptBase {
	readonly type: string;
	readonly name: string;
	readonly label: string;
}

interface TextFieldOpt extends FieldOptBase {
	type: 'text';
}

interface SelectFieldOpt extends FieldOptBase {
	type: 'select';
	options: [label: string, value: string][];
}

interface RangeFieldOpt extends FieldOptBase {
	type: 'range';
	options: [label: string, value: string][];
}

type FieldOpt = TextFieldOpt | SelectFieldOpt | RangeFieldOpt;

type FieldState = {
	selected: boolean;
	value: string | string[];
	readonly opts: FieldOpt;
};

export function fieldOptToElement(
	fieldOpt: FieldOpt,
	formikValueName: string,
	deleter?: React.ReactNode
): React.ReactNode | null {
	switch (fieldOpt.type) {
		case 'text':
			return (
				<div>
					<div>
						<strong>{fieldOpt.label}</strong>
					</div>
					<Field name={formikValueName} type="text" />
					{deleter}
				</div>
			);

		case 'select':
			return (
				<div>
					<div role="group">
						<div>
							<strong>{fieldOpt.label}</strong>
						</div>
						{/* this opt is [label, value] */}
						{fieldOpt.options.map((opt) => (
							<label key={opt[1]}>
								<Field name={formikValueName} type="checkbox" value={opt[1]} />
								{opt[0]}
							</label>
						))}
					</div>
					{deleter}
				</div>
			);

		case 'range':
			return null;

		default:
			return null;
	}
}

export default FieldOpt;

export type { FieldState, TextFieldOpt, SelectFieldOpt };
