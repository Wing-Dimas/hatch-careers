import { IconSquarePlus, IconX } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
  content: {
    padding: 0,
    minHeight: "90vh",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "1000px",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("body");

const JobModal = ({ modal, setModal, mode, setMode, id, setId, auth }) => {
  const [title, setTitle] = useState("");
  const [descrpitions, setDescriptions] = useState("");
  const [skills, setSkills] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [fixed, setFixed] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [industry, setIndustry] = useState("");
  const [publishOn, setPublishOn] = useState("");
  const [closeOn, setCloseOn] = useState("");
  const [status, setStatus] = useState("open");

  useEffect(() => {
    if (mode == "edit") {
      axios.get(route("jobs.edit", id)).then((res) => {
        const job = res.data;
        setTitle(job.title);
        setDescriptions(job.description);
        setSkills(job.skill);
        setQualifications(job.qualifications);
        setFixed(job.salary);
        setLocation(job.location);
        setJobType(job.job_type);
        setIndustry(job.industry);
        setPublishOn(moment(job.created_at).format("YYYY-MM-DDTkk:mm"));
        setCloseOn(moment(job.close_on).format("YYYY-MM-DDTkk:mm"));
        setStatus(job.status);
      });
    } else {
      setTitle("");
      setDescriptions("");
      setSkills("");
      setQualifications("");
      setFixed("");
      setLocation("");
      setJobType("");
      setIndustry("");
      setPublishOn(moment(new Date()).format("YYYY-MM-DDTkk:mm"));
      setCloseOn(moment(new Date()).format("YYYY-MM-DDTkk:mm"));
      setStatus("open");
    }
  }, [mode, id]);

  const handleSave = async () => {
    if (mode == "edit") {
      Inertia.put(route("jobs.update", id), {
        title,
        description: descrpitions,
        skill: skills,
        qualifications,
        salary: fixed,
        location,
        job_type: jobType,
        industry,
        close_on: closeOn,
        status,
      });
      await Swal.fire(
        "Berhasil Diupdate!",
        "Data perkerjaan berhasil di update",
        "success"
      );
    } else {
      Inertia.post(route("jobs"), {
        title,
        description: descrpitions,
        skill: skills,
        qualifications,
        salary: fixed,
        location,
        job_type: jobType,
        industry,
        close_on: closeOn,
        status,
        created_by: auth.user.name,
      });
      await Swal.fire(
        "Berhasil Ditambah!",
        "Data perkerjaan berhasil di tambah",
        "success"
      );
    }
    setModal(false);
  };

  return (
    <Modal
      isOpen={modal}
      onRequestClose={() => setModal(false)}
      style={customStyles}
      contentLabel="Example Modal"
      aria={{
        labelledby: "heading",
        describedby: "full_description",
      }}
    >
      <h2 className="p-4 text-xl font-medium border-b-2 border-b-[#dedede]">
        {mode == "edit" ? "Edit Jobs" : "Create New Job"}
      </h2>
      <div className="flex mt-4 px-4 gap-3 overflow-y-scroll pb-4 max-h-[70vh]">
        <div className="flex flex-col gap-3">
          <div className="grid gap-1">
            <label htmlFor="title" className="text-sm font-bold">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-6 p-4 border-2 border-[#dedede] rounded-md"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="descriptions" className="text-sm font-bold">
              Descriptions
            </label>
            <ReactQuill
              theme="snow"
              value={descrpitions}
              onChange={setDescriptions}
              id="descriptions"
              modules={modules}
              formats={formats}
            />
          </div>
          <div className="flex gap-3 pt-12 items-start">
            <div className="grid gap-1">
              <label htmlFor="descriptions" className="text-sm font-bold">
                Skills
              </label>
              <ReactQuill
                theme="snow"
                value={skills}
                onChange={setSkills}
                id="descriptions"
                modules={modules}
                formats={formats}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="descriptions" className="text-sm font-bold">
                Qualifications
              </label>
              <ReactQuill
                theme="snow"
                value={qualifications}
                onChange={setQualifications}
                id="descriptions"
                modules={modules}
                formats={formats}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-sm font-bold mb-2">Salary</h3>
            <div className="grid gap-1">
              <label htmlFor="fixed" className="text-sm font-bold">
                Fixed
              </label>
              <input
                id="fixed"
                name="fixed"
                type="text"
                value={fixed}
                onChange={(e) => setFixed(e.target.value)}
                className="h-6 p-4 border-[#dedede] rounded-sm"
              />
            </div>
          </div>
          <hr className="border-[#dedede]" />
          <div>
            <h3 className="text-sm font-bold mb-2">Location & Category</h3>
            <div className="grid gap-1">
              <label htmlFor="location" className="text-sm font-bold">
                Location
              </label>
              <select
                name="location"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-sm border-[#dedede] text-xs"
              >
                <option>(Choose Location)</option>
                <option value="surabaya">surabaya</option>
                <option value="sidoarjo">sidoarjo</option>
                <option value="gresik">gresik</option>
                <option value="mojokerto">mojokerto</option>
              </select>
            </div>
            <div className="grid gap-1">
              <label htmlFor="jobType" className="text-sm font-bold">
                Job Type
              </label>
              <select
                name="jobType"
                id="jobType"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="rounded-sm border-[#dedede] text-xs"
              >
                <option>(Choose Job Type)</option>
                <option value="internship">internship</option>
                <option value="volunteer">volunteer</option>
                <option value="freelance">freelance</option>
                <option value="part time">part time</option>
                <option value="full time">full time</option>
                <option value="contract">contract</option>
              </select>
            </div>
            <div className="grid gap-1">
              <label htmlFor="industry" className="text-sm font-bold">
                Industry
              </label>
              <select
                name="industry"
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="rounded-sm border-[#dedede] text-xs"
              >
                <option>(Choose Industry)</option>
                <option value="marketing">marketing</option>
                <option value="admin">admin</option>
                <option value="finance">finance</option>
                <option value="management">management</option>
              </select>
            </div>
          </div>
          <hr className="border-[#dedede]" />
          <div>
            <h3 className="text-sm font-bold mb-2">Date & Status</h3>
            <div className="grid gap-1">
              <label htmlFor="publishOn" className="text-sm font-bold">
                Publish On
              </label>
              <input
                type="datetime-local"
                name="publishOn"
                id="publishOn"
                value={publishOn}
                className="h-6 p-4 border-[#dedede] rounded-sm"
                disabled
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="closeOn" className="text-sm font-bold">
                Close On
              </label>
              <input
                type="datetime-local"
                name="closeOn"
                id="closeOn"
                value={closeOn}
                className="h-6 p-4 border-[#dedede] rounded-sm"
                onChange={(e) => setCloseOn(e.target.value)}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="status" className="text-sm font-bold">
                Status
              </label>
              <select
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="rounded-sm border-[#dedede] text-xs"
              >
                <option value="open">open</option>
                <option value="close">close</option>
                <option value="expired">expired</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse mt-4 px-4 gap-3">
        <button
          className="bg-green p-1 rounded-sm flex gap-1 items-center text-[#fff]"
          onClick={handleSave}
        >
          <IconSquarePlus size={14} color="rgb(40 167 69)" fill="#fff" />
          save
        </button>
        <button
          className="p-1 bg-[#888] rounded-sm flex gap-1 items-center text-[#fff]"
          onClick={() => setModal(false)}
        >
          <IconX size={14} />
          close
        </button>
      </div>
    </Modal>
  );
};

export default JobModal;
