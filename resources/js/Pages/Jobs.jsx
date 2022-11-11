import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";
import { IconFileSpreadsheet, IconFileText, IconPrinter } from "@tabler/icons";
import DataTable from "react-data-table-component";
import axios from "axios";
import moment from "moment";
import { Add, Show, Share, Delete, Edit } from "@/Components/Buttons";

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
        selector: (row) =>
            moment(new Date(row.created_at)).format("L hh:mm:ss"),
        sortable: true,
        reorder: true,
        maxWidth: "180px",
    },
    {
        name: "Action",
        selector: (row) => (
            <div className="flex gap-1">
                <Edit />
                <Show />
                <Share />
                <Delete />
            </div>
        ),
        sortable: true,
        reorder: true,
        maxWidth: "125px",
    },
];

export default function Jobs(props) {
    const jobs = props.jobs;

    const [sortTitle, setSortTitle] = useState("");
    const [sortIndustry, setSortIndustry] = useState("");
    const [sortJobType, setSortJobType] = useState("");
    const [sortStatus, setSortStatus] = useState("");
    const [sortTotalApplicant, setSortTotalApplicant] = useState("");
    const [sortAdmin, setSortAdmin] = useState("");

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
                    <Add>New Job</Add>
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
                <div className="flex justify-end">
                    <input className="border border-[#dedede] outline-none text-sm px-2" />
                </div>
                <div></div>
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
        </AuthenticatedLayout>
    );
}
