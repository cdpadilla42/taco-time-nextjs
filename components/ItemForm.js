import React from 'react';
import { Formik, Field, Form } from 'formik';

const ItemForm = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        image: '',
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <label htmlFor="name">Name</label>
        <Field id="name" name="name" placeholder="Al Pastor..." />

        <label htmlFor="description">Description</label>
        <Field
          id="description"
          name="description"
          placeholder="Pineapple on tacos???"
        />

        <label htmlFor="image">Image</label>
        <Field
          id="image"
          name="image"
          placeholder="Leave blank for random image"
          type="text"
        />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default ItemForm;
