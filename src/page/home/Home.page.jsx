/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Nav from "../../components/nav/Nav";
import { Button } from "../../components/ui/button";
import { PlusIcon } from "lucide-react";
import EmptyLottie from "../../components/lottieComponents/Empty.lottie";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "../../components/ui/sheet";
import AuthGuard from "../../components/guard/Auth.guard";
import FormTool from "./tool/Form.tool";
import {
  useCreateMutation,
  useGetQuery,
} from "../../store/service/endpoints/contact.endpoint";
import DataTableTool from "./tool/DataTable.tool";

const HomePage = () => {
  const { data, isError, isSuccess, isLoading } = useGetQuery();
  const [editData, setEditData] = useState({ edit: false, data: null });

  const handleEdit = (id) => {
    const apiData = data?.contacts?.data;
    const finder = apiData.find((i) => i.id === id);
    setEditData({ edit: true, data: finder });
  };

  const handleClose = () => {
    setEditData({ edit: false, data: null });
  };

  return (
    <AuthGuard>
      <Sheet>
        <div className="w-screen h-screen bg-[#fcfcfd]">
          <Nav />
          <div className="px-52 mx-auto my-3">
            <div className="flex justify-end">
              <SheetTrigger>
                <Button className="bg-blue text-white hover:bg-blue hover:opacity-90 rounded ">
                  <PlusIcon className="w-4 h-4 me-2 " />
                  <p>Create Contact</p>
                </Button>
              </SheetTrigger>
            </div>

            {data?.contacts?.data?.length > 0 ? (
              <DataTableTool
                handleEdit={handleEdit}
                apiData={data?.contacts?.data}
              />
            ) : (
              <div className="shadow flex flex-col justify-center items-center bg-white h-[500px] w-full mt-3 rounded">
                <EmptyLottie />
                <p className="text-2xl font-bold text-blue animate-pulse">
                  There is no list...
                </p>
              </div>
            )}
          </div>
          <SheetContent
            className="bg-white"
            onClose={handleClose}
            onOverlayClick={handleClose}
          >
            <SheetHeader>
              <SheetTitle>Contact Information</SheetTitle>
            </SheetHeader>
            <FormTool editData={editData} handleClose={handleClose} />
          </SheetContent>
        </div>
      </Sheet>
    </AuthGuard>
  );
};

export default HomePage;
