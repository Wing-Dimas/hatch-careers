import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";
import DataTable from "react-data-table-component";
import moment from "moment";
import { Add, Show, Share, Delete, Edit } from "@/Components/Buttons";
import RoleModal from "@/Components/Modal/RoleModal";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";

const customStyles = {
  rows: {
    // override the row height
    style: {
      minHeight: "72px",
    },
  },
  headCells: {
    // override the cell padding for head cells
    style: {
      fontWeight: "bold",
      fontSize: "14px",
      paddingRight: "8px",
      zIndex: "10",
    },
  },
  cells: {
    // override the cell padding for data cells
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      fontWeight: "500",
    },
  },
};

export default function Roles(props) {
  const roles = props.roles;
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [mode, setMode] = useState("");

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      reorder: true,
      wrap: true,
    },
    {
      name: "Created at",
      selector: (row) => moment(row.created_at).format("L"),
      sortable: true,
      reorder: true,
      wrap: true,
      maxWidth: "230px",
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex gap-1">
          <Edit
            onClick={() => {
              setId(row.id);
              setMode("edit");
              setModal(true);
            }}
          />
          <Show />
          <Share />
          <Delete
            onClick={() => {
              handleDelete(row.id);
            }}
          />
        </div>
      ),
      sortable: true,
      reorder: true,
      maxWidth: "125px",
    },
  ];

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Inertia.delete(route("roles.destroy", id));
        await Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your data role is safe :)", "error");
      }
    });
  };

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={
        <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
          Roles
        </h2>
      }
    >
      <Head title="Jobs" />

      <div className="py-6 mx-8 max-w-7xl sm:px-6 lg:px-8 bg-[#fff]">
        <div className="flex justify-end">
          <Add
            onClick={() => {
              setMode("tambah");
              setModal(true);
            }}
          >
            New Role
          </Add>
        </div>
        <DataTable
          columns={columns}
          data={roles}
          customStyles={customStyles}
          selectableRowsRadio="checkbox"
          selectableRows
          selectableRowsHighlight
          pagination
          responsive
          fixedHeader
          persistTableHead={true}
          fixedHeaderScrollHeight="300px"
          defaultSortFieldId={1}
          className="border-t-2 border-t-gray mt-3"
        />
      </div>

      <RoleModal modal={modal} setModal={setModal} mode={mode} id={id} />
    </AuthenticatedLayout>
  );
}
