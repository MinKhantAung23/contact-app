/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import SweetAlert2 from "react-sweetalert2";
import { useDeleteMutation } from "../../../store/service/endpoints/contact.endpoint";
import { SheetTrigger } from "../../../components/ui/sheet";

const DataTableTool = ({ apiData, handleEdit }) => {
  const [swalProps, setSwalProps] = useState();
  const [deleteFun, { data, isLoading, isError }] = useDeleteMutation();
  // console.log("hh", data);

  const handleDelete = (id) => {
    setSwalProps({
      show: true,
      title: "Are you sure?",
      text: "You want to remove?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "red",
      onResolve: () => {
        setSwalProps({
          show: false,
        });
      },
      onConfirm: async () => {
        await deleteFun(id);
        setSwalProps({
          show: false,
        });
      },
    });
  };

  return (
    <div className="my-5">
      <Table className="">
        <TableHeader className="">
          <TableRow className="bg-blue text-white hover:bg-blue">
            <TableHead className="">No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-end">Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiData?.map((i) => (
            <TableRow key={i.id} className="bg-[#fcfcfd] hover:bg-[#edeaeaf4]">
              <TableCell>{i.id}</TableCell>
              <TableCell>{i.name}</TableCell>
              <TableCell>{i.email}</TableCell>
              <TableCell className="text-end">{i.phone}</TableCell>
              <TableCell className="text-wrap">{i.address}</TableCell>
              <TableCell className="text-xl space-x-5">
                <SheetTrigger>
                  <button onClick={handleEdit.bind(null, i.id)} className="">
                    <Pencil className="w-5 h-5" />
                  </button>
                </SheetTrigger>
                <button onClick={handleDelete.bind(null, i.id)}>
                  <Trash2 className="text-danger w-5 h-5" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SweetAlert2 {...swalProps} />
    </div>
  );
};

export default DataTableTool;
