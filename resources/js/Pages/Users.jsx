import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import DataTable from "react-data-table-component";
import moment from "moment";
import { Add, Show, Share, Delete, Edit } from "@/Components/Buttons";
import UserModal from "@/Components/Modal/User/UserModal";
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

export default function Users(props) {
  const { flash } = usePage().props;
  const users = props.users.map((user) => {
    return {
      ...user,
      role_name:
        props.roles.find((role) => role.id === user.role_id) == undefined
          ? "Tidak ada"
          : props.roles.find((role) => role.id === user.role_id).name,
    };
  });
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
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      reorder: true,
      wrap: true,
    },
    {
      name: "Role",
      selector: (row) => row.role_name,
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
        Inertia.delete(route("users.destroy", id));
        await Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your data user is safe :)", "error");
      }
    });
  };

  if (flash.message) {
    props.flash.status == "success"
      ? Swal.fire("Berhasil Diupdate!", props.flash.message, "success")
      : Swal.fire("Gagal Update!", props.flash.message, "error");
    flash.message = null;
    flash.status = null;
  }

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={
        <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
          Users
        </h2>
      }
    >
      <Head title="Users" />

      <div className="py-6 mx-8 max-w-7xl sm:px-6 lg:px-8 bg-[#fff]">
        <div className="flex justify-end">
          <Add
            onClick={() => {
              setMode("tambah");
              setModal(true);
            }}
          >
            New User
          </Add>
        </div>
        <DataTable
          columns={columns}
          data={users}
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

      <UserModal
        modal={modal}
        setModal={setModal}
        mode={mode}
        id={id}
        setId={setId}
        roles={props.roles}
      />
    </AuthenticatedLayout>
  );
}
