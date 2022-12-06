import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";
import {
  IconChevronDown,
  IconChevronUp,
  IconFileSpreadsheet,
  IconFileText,
  IconPrinter,
  IconX,
} from "@tabler/icons";
import DataTable from "react-data-table-component";
import axios from "axios";
import moment from "moment";
import { Add, Show, Share, Delete, Edit } from "@/Components/Buttons";
import Sort from "@/Components/Sort";
import JobModal from "@/Components/Modal/JobModal";
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

export default function Jobs(props) {
  const jobs = props.jobs;
  const listIndustry = props.listIndustry;
  const listJobType = props.listJobType;
  const listStatus = props.listStatus;
  const listAdmin = props.listCreatedBy;

  const [sortTitle, setSortTitle] = useState("");
  const [sortIndustry, setSortIndustry] = useState("");
  const [sortJobType, setSortJobType] = useState("");
  const [sortStatus, setSortStatus] = useState("");
  const [sortTotalApplicant, setSortTotalApplicant] = useState("");
  const [sortAdmin, setSortAdmin] = useState("");
  const [sortTime, setSortTime] = useState("");

  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [mode, setMode] = useState("");

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      reorder: true,
      wrap: true,
      maxWidth: "230px",
    },
    {
      name: "Industry",
      selector: (row) => row.industry,
      sortable: true,
      reorder: true,
      maxWidth: "50px",
      center: true,
    },
    {
      name: "Job Type",
      selector: (row) => row.job_type,
      sortable: true,
      reorder: true,
      maxWidth: "105px",
      center: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div
          className={`text-xs font-bold rounded-sm px-1 ${
            row.status == "open"
              ? "bg-green text-[#fff]"
              : row.status == "close"
              ? "bg-red text-[#fff]"
              : "bg-yellow"
          }`}
        >
          {row.status}
        </div>
      ),
      maxWidth: "80px",
      center: true,
    },
    {
      name: "Total Applicants",
      selector: (row) => `${row.total_applicants} person`,
      sortable: true,
      reorder: true,
      maxWidth: "120px",
      center: true,
    },
    {
      name: "Created By",
      selector: (row) => row.created_by,
      sortable: true,
      reorder: true,
      maxWidth: "120px",
    },
    {
      name: "Publish On",
      selector: (row) => moment(new Date(row.created_at)).format("L hh:mm:ss"),
      sortable: true,
      reorder: true,
      maxWidth: "180px",
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
        Inertia.delete(route("jobs.destroy", id));
        await Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your data job is safe :)", "error");
      }
    });
  };

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={
        <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
          Jobs
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
            New Job
          </Add>
        </div>
        <div className="flex gap-4 bg-[#dedede] w-max p-1 rounded-sm">
          <button>
            <IconFileText />
          </button>
          <button>
            <IconFileSpreadsheet />
          </button>
          <button>
            <IconPrinter />
          </button>
        </div>
        <hr className="border-[#dedede] mt-4" />
        <div className="flex gap-4 mt-4">
          <div className="block w-4"></div>
          <input
            type="text"
            value={sortTitle}
            onChange={(e) => setSortTitle(e.target.value)}
            className="w-full rounded-sm border-[#dedede] border-2 outline-none p-2 h-8 text-sm"
          />
          <Sort
            options={listIndustry.map((list) => {
              return {
                label: list.industry,
                value: list.industry,
              };
            })}
            value={sortIndustry}
            onChange={setSortIndustry}
            placeHolder="All Industry"
          />
          <Sort
            options={listJobType.map((list) => {
              return {
                label: list.job_type,
                value: list.job_type,
              };
            })}
            value={sortJobType}
            onChange={setSortJobType}
            placeHolder="All Job Type"
          />
          <Sort
            options={listStatus.map((list) => {
              return {
                label: list.status,
                value: list.status,
              };
            })}
            value={sortStatus}
            onChange={setSortStatus}
            placeHolder="All Status"
          />
          <Sort
            options={[
              { label: "0", value: 0 },
              { label: "> 5", value: 5 },
              { label: "> 10", value: 10 },
              { label: "> 20", value: 20 },
              { label: "> 50", value: 50 },
            ]}
            value={sortTotalApplicant}
            onChange={setSortTotalApplicant}
            placeHolder="All Applicant"
          />
          <Sort
            options={listAdmin.map((list) => {
              return {
                label: list.created_by,
                value: list.created_by,
              };
            })}
            value={sortAdmin}
            onChange={setSortAdmin}
            placeHolder="All Admin"
          />
          <Sort
            options={[{ label: "week", value: "week" }]}
            value={sortTime}
            onChange={setSortTime}
            placeHolder="All the time"
          />
          <button
            className="bg-[#888] p-2 rounded-sm"
            onClick={() => {
              setSortTitle("");
              setSortIndustry("");
              setSortJobType("");
              setSortStatus("");
              setSortTotalApplicant("");
              setSortAdmin("");
              setSortTime("");
            }}
          >
            <IconX size={12} />
          </button>
        </div>
        <DataTable
          columns={columns}
          data={jobs}
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

      <JobModal
        modal={modal}
        setModal={setModal}
        mode={mode}
        id={id}
        auth={props.auth}
      />
    </AuthenticatedLayout>
  );
}
