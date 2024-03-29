import type { NextPage } from "next";
import Link from 'next/link';
import * as yup from 'yup';
import { Form, Field, Formik } from 'formik';
import { useAppSelector, useAppDispatch } from "../../hooks";
import { login, reset } from "../../slices/auth/auth";
import Spinner from "../../components/Spinner";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


const LogInSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password is too short - 6 chars minimum'),
});

const initialValues = {
  email: '',
  password: '',
};

const Login: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [err, setErr] = useState('');
  
  const { user, isError, isSuccess, isLoading, message } = useAppSelector((state) => state.auth);
  const validBtn =
    'text-white p-4 font-bold tracking-tighter bg-blue-700 w-full mt-6 outline-none appearance-none border-none focus:ring-4 focus:ring-gray-400';
  const disabledBtn =
    'text-white p-4 font-bold tracking-tighter bg-gray-500 w-full mt-6 outline-none appearance-none border-none focus:ring-4 focus:ring-gray-400';
  
    useEffect(() => {
      if(Object.keys(user).length !== 0) router.push('/app/dashboard')
      if(isError) setErr(message);
      if(isSuccess && user) router.push('/app/dashboard')
      dispatch(reset())
    }, [isError, isSuccess, dispatch, user, message, router]);

  if (isLoading) return <Spinner />
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LogInSchema}
      onSubmit={async(values) => {
        dispatch(login(values));
      }}
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
          <div>
            <div className="lg:w-1/2 lg:mx-auto mx-2 my-16 border-2 py-6 px-4 ">
              <>
                <h1 className="text-xl lg:text-2xl text-left">Welcome back!</h1>
                <p className="text-gray-500 text-left">
                  Access your courses in clicks!
                </p>

                <div className="md:flex-1 flex-auto flex-wrap mt-6">
                  <Form
                    className="p-2 w-auto"
                  >
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
                        className="py-3 px-5 w-full border-solid border-2 rounded-sm outline-none appearance-none focus:ring-1 focus:border-blue-700"
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
                        className="py-3 px-5 w-full border-solid border-2 rounded-sm outline-none appearance-none focus:ring-1 focus:border-blue-700"
                        required
                      />
                      {errors.password && touched.password ? (
                        <div className="text-rose-900">{errors.password}</div>
                      ) : null}
                    </div>
                    <button
                      type="submit"
                      className={!(dirty && isValid) ? disabledBtn : validBtn}
                      disabled={!(dirty && isValid)}
                    >
                      Log in
                    </button>
                    <>
                      <p className="text-right text-sm m-2 p-2">
                        Already have an account?{' '}
                        <Link href="/auth/signup">
                          <a className="underline text-blue-700">Sign up</a>
                        </Link>
                      </p>
                    </>
                  </Form>
                </div>
              </>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;