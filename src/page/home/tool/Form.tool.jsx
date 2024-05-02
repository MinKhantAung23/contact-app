/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import * as yup from "yup";
import {
  useCreateMutation,
  useUpdateMutation,
} from "../../../store/service/endpoints/contact.endpoint";
import { Loader2 } from "lucide-react";
import { SheetClose } from "../../../components/ui/sheet";

const FormTool = ({ editData, handleClose }) => {
  const closeRef = useRef();
  const initialValue = {
    name: editData.data?.name || "",
    email: editData.data?.email || "",
    phone: editData.data?.phone || "",
    address: editData.data?.address || "",
  };

  const [fun, { data, isError, isSuccess, isLoading }] = useCreateMutation();
  const [updateFun, apiData] = useUpdateMutation();

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "must be at least 2 letters"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invilid email address"),
    phone: yup.string().required("Phone number is required"),
    address: yup.string().required("Address is required"),
  });

  const handleSubmit = async (value, action) => {
    if (editData.edit) {
      await updateFun({ id: editData.data?.id, ...value });
    } else {
      await fun(value);
    }
    // action.reset();
    closeRef.current.click();
  };

  // useEffect(() => {
  //   console.log("helloworld", editData.data);
  // }, [editData.data]);
  return (
    <div className="h-full">
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ handleBlur, handleChange, isSubmitting, values }) => (
          <>
            <Form className="flex flex-col justify-between h-screen pb-12">
              <div className="space-y-2 mt-3 px-2">
                <div>
                  <Label htmlFor="name" className="text-gray">
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
                    placeholder="John Doe"
                  />
                  <ErrorMessage
                    component={"p"}
                    name="name"
                    className="text-danger mb-2 text-sm"
                  />
                </div>

                <div>
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
                    className="text-danger text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray">
                    Phone Number
                  </Label>
                  <Input
                    onBlur={handleBlur}
                    value={values.phone}
                    onChange={handleChange}
                    className="mt-3 rounded"
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="959+++"
                  />
                  <ErrorMessage
                    component={"p"}
                    name="phone"
                    className="text-danger text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-gray">
                    Email Address
                  </Label>
                  <Input
                    onBlur={handleBlur}
                    value={values.address}
                    onChange={handleChange}
                    className="mt-3 rounded"
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Your address"
                  />
                  <ErrorMessage
                    component={"p"}
                    name="address"
                    className="text-danger text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 px-2">
                <SheetClose className="w-full my-5">
                  <Button
                    disabled={isSubmitting}
                    variant="outline"
                    onClick={handleClose}
                    className="w-full hover:opacity-85 rounded"
                    type="button"
                    ref={closeRef}
                  >
                    Cancel
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                  </Button>
                </SheetClose>
                <Button
                  disabled={isSubmitting}
                  className="bg-blue w-full my-5 hover:bg-blue hover:opacity-85 rounded"
                  type="submit"
                >
                  Create
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                </Button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default FormTool;
