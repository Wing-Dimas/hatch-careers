import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";
import DataTable from "react-data-table-component";
import moment from "moment";
import { Add, Show, Share, Delete, Edit } from "@/Components/Buttons";
import RoleModal from "@/Components/Modal/RoleModal";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";
import Schedule from "@/Components/Buttons/Schedule";
import axios from "axios";
import ScheduleModal from "@/Components/Modal/Applicants/ScheduleModal";
import DetailModal from "@/Components/Modal/Applicants/DetailModal";
import EditModal from "@/Components/Modal/Applicants/EditModal";

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

export default function Applicants(props) {
  const findJob = (applicant) => {
    const interview = props.interviews.find((interview) => {
      return interview.applicant_id == applicant.id;
    });
    if (interview != undefined) {
      const job = props.jobs.find((job) => job.id == interview.job_id);
      if (job != undefined) {
        return job.title;
      }
    }
    return undefined;
  };

  const findInterviewDate = (applicant) => {
    const interview = props.interviews.find((interview) => {
      return interview.applicant_id == applicant.id;
    });

    if (interview) {
      const detailInterviews = props.detail_interviews.filter((el) => {
        return el.interview_id === interview.id;
      });
      if (detailInterviews.length) {
        detailInterviews.sort((a, b) => {
          return (
            new Date(b.interview_date).getTime() -
            new Date(a.interview_date).getTime()
          );
        });
        const data = detailInterviews[0];
        return {
          interview_id: interview.id,
          interview_status: interview.status,
          interview_date: data.interview_date,
          section: data.section,
        };
      } else {
        return {
          interview_id: interview.id,
          interview_status: interview.status,
          interview_date: undefined,
          section: undefined,
        };
      }
    }
    return {
      interview_id: undefined,
      interview_status: undefined,
      interview_date: undefined,
      section: undefined,
    };
  };

  const applicants = props.applicants.map((applicant) => {
    const { interview_date, interview_status, section, interview_id } =
      findInterviewDate(applicant);
    return {
      ...applicant,
      job_name: findJob(applicant),
      interview_status,
      interview_date,
      interview_id,
      section,
    };
  });

  const [scheduleModal, setScheduleModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [id, setId] = useState("");
  const [interviewId, setInterviewId] = useState("");

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
      name: "Mobile Number",
      selector: (row) => row.mobile_number,
      sortable: true,
      reorder: true,
      wrap: true,
      maxWidth: "100px",
    },
    {
      name: "Job",
      selector: (row) => row.job_name,
      sortable: true,
      reorder: true,
      wrap: true,
      maxWidth: "100px",
    },
    {
      name: "Apply On",
      selector: (row) => moment(row.created_at).format("LLL"),
      sortable: true,
      reorder: true,
      wrap: true,
    },
    {
      name: "Interview Date (Current)",
      selector: (row) => row.interview_date,
      sortable: true,
      reorder: true,
      wrap: true,
      maxWidth: "100px",
    },
    {
      name: "section (Current)",
      selector: (row) => row.section,
      sortable: true,
      reorder: true,
      wrap: true,
      maxWidth: "100px",
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex gap-1">
          {row.interview_status == "progress" && (
            <>
              <Schedule
                onClick={() => {
                  setId(row.id);
                  setInterviewId(row.interview_id);
                  setScheduleModal(true);
                }}
              />
              <Edit
                onClick={() => {
                  setId(row.id);
                  setInterviewId(row.interview_id);
                  setEditModal(true);
                }}
              />
            </>
          )}

          <Show
            onClick={() => {
              setId(row.id);
              setInterviewId(row.interview_id);
              setDetailModal(true);
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
        Inertia.delete(route("applicants.destroy", id));
        await Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your data applicant is safe :)", "error");
      }
    });
  };

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={
        <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
          Applicants
        </h2>
      }
    >
      <Head title="Applicants" />

      <div className="py-6 mx-8 max-w-7xl sm:px-6 lg:px-8 bg-[#fff]">
        <DataTable
          columns={columns}
          data={applicants}
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

      <ScheduleModal
        modal={scheduleModal}
        setModal={setScheduleModal}
        id={id}
        interviewId={interviewId}
      />
      <DetailModal
        modal={detailModal}
        setModal={setDetailModal}
        id={id}
        interviewId={interviewId}
      />
      <EditModal
        modal={editModal}
        setModal={setEditModal}
        id={id}
        interviewId={interviewId}
      />
    </AuthenticatedLayout>
  );
}
