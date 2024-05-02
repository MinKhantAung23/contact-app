/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Loader2 } from "lucide-react";
import { ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "../../store/service/endpoints/auth.endpoints";
import AuthGuard from "../../components/guard/Auth.guard";
import { toast } from "sonner";

const SignInPage = () => {
  const nav = useNavigate();
  const [fun, data] = useSignInMutation();
  // console.log(data);

  const initialValue = {
    email: "",
    password: "",
  };

  const validtaionSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must have 8 letters"),
  });

  const handleSubmit = async (value) => {
    // console.log(value);
    await fun(value);
  };

  useEffect(() => {
    if (data?.data?.success) {
      nav("/home");
    }
  }, [data]);

  return (
    <AuthGuard check={data?.data?.success} token={data?.data?.token}>
      <div className="w-3/5 mx-auto h-full flex justify-center items-center">
        <Card className="w-[350px] shadow-md rounded">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Sign In</CardTitle>
            <CardDescription className="text-blue underline">
              <Link to={"/sign_up"}> I don't have an account</Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={initialValue}
              onSubmit={handleSubmit}
              validationSchema={validtaionSchema}
              validateOnBlur={false}
              validateOnChange={false}
            >
              {({ handleBlur, handleChange, isSubmitting, values }) => (
                <>
                  <Form>
                    <Label htmlFor="email" className="text-gray">
                      Email Address
                    </Label>
                    <Input
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      className="mt-3 rounded"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="example@gamil.com"
                    />
                    <ErrorMessage
                      component={"p"}
                      name="email"
                      className="text-danger mb-2 text-sm"
                    />

                    <Label htmlFor="email" className="text-gray">
                      Password
                    </Label>
                    <Input
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      className="mt-3 rounded"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your password"
                    />
                    <ErrorMessage
                      component={"p"}
                      name="password"
                      className="text-danger text-sm"
                    />

                    {isSubmitting ? (
                      <Button
                        disabled
                        className="bg-blue w-full my-5 hover:bg-blue rounded"
                      >
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </Button>
                    ) : (
                      <Button
                        disabled={isSubmitting}
                        className="bg-blue w-full my-5 hover:bg-blue hover:opacity-85 rounded"
                        type="submit"
                      >
                        Sign In
                      </Button>
                    )}
                  </Form>
                </>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
};

export default SignInPage;
