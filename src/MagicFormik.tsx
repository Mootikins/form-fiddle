import React from 'react';
import { Form, Formik } from 'formik';
import FieldOpt, { FieldState, fieldOptToElement } from './FieldOpt';
import DynamicSelect from './DynamicSelect';

export type FormikValues = {
	fields: FieldState[];
	fieldSelect: string;
};

interface MagicFormikProps {
	fields: FieldOpt[];
}

const MagicFormik: React.FC<MagicFormikProps> = (props) => {
	const initialFormikValues: FormikValues = {
		fieldSelect: 'placeholder',
		fields: props.fields.map((fieldOpt: FieldOpt) => {
			return {
				selected: false,
				value: '',
				opts: fieldOpt,
			};
		}),
	};

	return (
		<div>
			<Formik
				initialValues={initialFormikValues}
				onSubmit={async (_values) => {
					await new Promise((r) => setTimeout(r, 500));
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<div>
							{values.fields
								.map((fState, index) => {
									const deleter = (
										<button
											type="button"
											onClick={(_) => {
												setFieldValue(`fields.${index}.selected`, false);
												setFieldValue(`fields.${index}.value`, '');
											}}
										>
											X
										</button>
									);
									// .filter resets indices, so we have to
									// pseudo-filter by returning null then
									// filtering them
									return fState.selected ? (
										// element if selected
										<div key={index}>
											{fieldOptToElement(
												fState.opts,
												`fields.${index}.value`,
												deleter
											)}
										</div>
									) : null;
									// otherwise we don't want it
								})
								.filter((el) => !!el)}

							<DynamicSelect values={values.fields} name="fieldSelect" />

							{/* Button to "select" the given field, resetting
									the dropdown to the placeholder */}
							<button
								type="button"
								onClick={() => {
									setFieldValue(`fields.${values.fieldSelect}.selected`, true);
									setFieldValue('fieldSelect', 'placeholder');
								}}
							>
								Add Field
							</button>
						</div>

						<div>
							<button type="submit">Submit</button>
						</div>

						<pre>
							{values.fields
								.map((fState) =>
									// build our key:value pair
									fState.selected && fState.value && fState.opts.name
										? {
												name: fState.opts.name,
												value: fState.value,
										  }
										: null
								)
								// remove nulls
								.filter((nameValuePair) => !!nameValuePair)
								// encode as query string -- we already filtered nulls
								.map((obj) => {
									return `${obj!.name}=${encodeURIComponent(`${obj!.value}`)}`;
								})
								.join('&')}
						</pre>
						<pre>{JSON.stringify(values, null, 2)}</pre>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default MagicFormik;
