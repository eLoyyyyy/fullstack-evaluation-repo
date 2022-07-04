import Head from 'next/head'
import Image from 'next/image'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { useQuery, useMutation } from 'urql';


const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const InsertUser = `
  mutation insert_single_users($object: users_insert_input! ) {
    insert_users_one(object: $object) {
      id
    }
  }
`;

const UserQuery = `
  query getUsers {
    users {
      id
      first_name
      last_name
    }
  }
`;

export default function Home() {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async values => {
      // alert(JSON.stringify(values, null, 2));
      insertUser({
        object: {
          first_name: values.firstName,
          last_name: values.lastName
        }
      }).then(() => {
        reexecuteQuery()
      })
    },
  });

  const [insertUserResult, insertUser] = useMutation(InsertUser);
  const [result, reexecuteQuery] = useQuery({
    query: UserQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

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

          <button className="btn" type="submit">Submit</button>
        </form>

        <ul>
          {data.users.map(user => (
            <li key={user.id}>{`${user.first_name} ${user.last_name}`}</li>
          ))}
        </ul>
      </main>
    </div>
  )
}
