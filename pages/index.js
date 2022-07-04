import Head from 'next/head'
import Image from 'next/image'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export default function Home() {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: SignupSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <Head>
        <title>Fullstack Evaluation</title>
        <meta name="description" content="Evaluation repo to whether or not I'm a fullstack dev." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-center gap-y-6"
        >
          <div className="form-control">
            <label className="input-group">
              <span>First Name</span>
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                className="input input-bordered"
              />
            </label>
            {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
          </div>
          <div className="form-control">
            <label className="input-group">
              <span>Last Name</span>
              <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                className="input input-bordered"
              />
            </label>
            {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
          </div>
          <div className="form-control">
            <label className="input-group">
              <span>Email</span>
              <input
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="input input-bordered"
              />
            </label>
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
          </div>

          <button className="btn" type="submit">Submit</button>
        </form>
      </main>
    </div>
  )
}
