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
import { useSignUpMutation } from "../../store/service/endpoints/auth.endpoints";
import { useToast } from "../../components/ui/use-toast";
import { toast } from "sonner";
import AuthGuard from "../../components/guard/Auth.guard";

const SignUpPage = () => {
  const [fun, data] = useSignUpMutation();
  const nav = useNavigate();

  const { toast } = useToast();

  const initialValue = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const validtaionSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must have more than 2 letter"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must have at least 8 letters"),
    password_confirmation: yup
      .string()
      .required("Password confirmation required")
      .oneOf(
        [yup.ref("password"), null],
        "Password confirmation should match with password"
      ),
  });

  const handleSubmit = async (value) => {
    // console.log(value);
    await fun(value);
  };

  useEffect(() => {
    if (data.error) {
      toast({
        title: "Auth Error From Server",
        description: data.error.data?.message,
      });
    } else if (data.data) {
      nav("/");
    }
  }, [data]);
  return (
    <AuthGuard path="/sign_up">
      <div className="w-3/5 mx-auto h-full flex justify-center items-center">
        <Card className="w-[350px] shadow-md rounded">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Sign Up</CardTitle>
            <CardDescription className="text-blue underline">
              <Link to={"/"}>I already have an account</Link>
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
                      Name
                    </Label>
                    <Input
                      onBlur={handleBlur}
                      value={values.name}
                      onChange={handleChange}
                      className="mt-3 rounded"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your Name"
                    />
                    <ErrorMessage
                      component={"p"}
                      name="name"
                      className="text-danger mb-2 text-sm"
                    />

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

                    <Label htmlFor="email" className="text-gray">
                      Confirm Password
                    </Label>
                    <Input
                      onBlur={handleBlur}
                      value={values.password_confirmation}
                      onChange={handleChange}
                      className="mt-3 rounded"
                      type="password"
                      name="password_confirmation"
                      id="password_confirmation"
                      placeholder="Your Password"
                    />
                    <ErrorMessage
                      component={"p"}
                      name="confirm_password"
                      className="text-danger mb-2 text-sm"
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
                        Sign Up
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

export default SignUpPage;
