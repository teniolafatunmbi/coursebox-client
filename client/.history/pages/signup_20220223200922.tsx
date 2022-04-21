import type { NextPage } from "next";
import Link from 'next/link';
import * as yup from 'yup';
import { Form, Field, Formik } from 'formik';

const SignUpSchema = yup.object().shape({
  firstname: yup.string().required('Firstname is required'),
  lastname: yup.string().required('Lastname is required'),
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password is too short - 6 chars minimum'),
});

// declare initial values for state
const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
};

const Signup: NextPage = () => {
  // const [formValues, setFormValues] = useState(initialValues);

  // custom handleChange function
  /*const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    console.log(e.currentTarget.value)
    setFormValues({ ...formValues, [name]: value });
  };*/

  const validBtn =
    'text-white p-4 font-bold tracking-tighter bg-blue-700 w-full mt-6 outline-none appearance-none border-none focus:ring-4 focus:ring-gray-400';
  const disabledBtn =
    'text-white p-4 font-bold tracking-tighter bg-gray-500 w-full mt-6 outline-none appearance-none border-none focus:ring-4 focus:ring-gray-400';
  const handleSubmit = (values: object) => {
    return console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignUpSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        let {
          values,
          handleChange,
          handleBlur,
          isValid,
          dirty,
          errors,
          touched,
        } = formik;

        return (
          <div className="lg:w-1/2 lg:mx-auto mx-2 my-16 border-2 py-6 px-4 ">
            <>
              <h1 className="text-xl lg:text-2xl text-left">
                Welcome to <span className="text-[#0070f3]">
                  <a href="/" className="hover:underline text-blue-700 cursor-pointer">CourseBox</a>
                  </span>
              </h1>
              <p className="text-gray-500 text-left">
                Manage your stocks on the go
              </p>

              <div className="md:flex-1 flex-auto flex-wrap mt-6">
                <Form
                  onSubmit={handleSubmit}
                  method="POST"
                  className="p-2 w-auto"
                >
                  <div className="grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
                    <div className="w-full mt-4">
                      <label
                        htmlFor="firstname"
                        className="px-5 pt-1.5 rounded-sm text-sm tracking-tighter"
                      >
                        Firstname
                      </label>
                      <Field
                        id="firstname"
                        type="text"
                        name="firstname"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstname}
                        className="py-3 px-5 w-full border-solid border-2 rounded-sm outline-none appearance-none focus:ring-1 focus:border-blue-700"
                        required
                      />
                      {errors.firstname && touched.firstname ? (
                        <div className="text-rose-900">{errors.firstname}</div>
                      ) : null}
                    </div>
                    <div className="w-full mt-4">
                      <label
                        htmlFor="lastname"
                        className="px-5 py-1.5 rounded-sm text-sm tracking-tighter"
                      >
                        Lastname
                      </label>
                      <Field
                        id="lastname"
                        type="text"
                        name="lastname"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastname}
                        className="py-3 px-5 w-full border-solid border-2 rounded-sm outline-none appearance-none focus:ring-1 focus:border-blue-700"
                        required
                      />
                      {errors.lastname && touched.lastname ? (
                        <div className="text-rose-900">{errors.lastname}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    <label
                      htmlFor="email"
                      className="px-5 py-1.5 text-sm tracking-tighter"
                    >
                      Email address
                    </label>
                    <Field
                      id="email"
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="py-3 px-5 w-full border-solid border-2 rounded-sm rounded-sm outline-none appearance-none focus:ring-1 focus:border-blue-700"
                      required
                    />
                    {errors.email && touched.email ? (
                      <div className="text-rose-900">{errors.email}</div>
                    ) : null}
                  </div>
                  <div className="w-full mt-4">
                    <label
                      htmlFor="password"
                      className="px-5 py-1.5 text-sm tracking-tighter"
                    >
                      Password
                    </label>
                    <Field
                      id="password"
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="py-3 px-5 w-full border-solid border-2 rounded-sm rounded-sm outline-none appearance-none focus:ring-1 focus:border-blue-700"
                      required
                    />
                    {errors.password && touched.password ? (
                      <div className="text-rose-900">{errors.password}</div>
                    ) : null}
                  </div>
                  <p className="m-2">
                    <input type="checkbox" />{' '}
                    <span>
                      By clicking this link you agree to our terms of services
                    </span>
                  </p>
                  <button
                    type="submit"
                    className={!(dirty && isValid) ? disabledBtn : validBtn}
                    disabled={!(dirty && isValid)}
                  >
                    Sign up
                  </button>
                  <>
                    <p className="text-right text-sm m-2 p-2">
                      Don&apos;at have an account?{' '}
                      <Link href="/login">
                          <a className="underline text-blue-700">Log in</a>
                      </Link>
                    </p>
                  </>
                </Form>
              </div>
            </>
          </div>
        );
      }}
    </Formik>
  );
};

export default Signup;