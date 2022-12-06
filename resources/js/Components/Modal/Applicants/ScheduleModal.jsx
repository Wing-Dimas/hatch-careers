import { IconSquarePlus, IconX } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

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
    paddingBottom: "10px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "400px",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("body");

const ScheduleModal = ({ modal, setModal, id, interviewId }) => {
  const [interviewDate, setInterviewDate] = useState("");
  const [section, setSection] = useState("");
  const [job, setJob] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (id) {
      axios.get(route("applicants.create.schedule", id)).then((res) => {
        const data = res.data[0];
        setJob(data.title);
        setName(data.name);
      });
    }
  }, [id]);

  const handleSave = async () => {
    Inertia.post(route("applicants.store.schedule", interviewId), {
      interview_date: interviewDate,
      section,
    });
    await Swal.fire("Schedule dibuat!", "Schedule has been create", "success");
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
        Create Interview Schedule
      </h2>
      <div className="mt-4 grid gap-3">
        <div className="grid gap-3 grid-cols-1">
          <label className="text-sm font-bold">Job</label>
          <p>{job}</p>
        </div>
        <div className="grid gap-3 grid-cols-1">
          <label className="text-sm font-bold">Applicant</label>
          <p>{name}</p>
        </div>
        <div className="grid gap-3 grid-cols-1">
          <label htmlFor="interviewDate" className="text-sm font-bold">
            Interview Date*
          </label>
          <input
            name="interviewDate"
            id="interviewDate"
            type="datetime-local"
            value={interviewDate}
            onChange={(e) => setInterviewDate(e.target.value)}
            className="rounded-sm border-[#dedede] text-xs"
          ></input>
        </div>
        <div className="grid gap-3 grid-cols-1">
          <label htmlFor="section" className="text-sm font-bold">
            Section*
          </label>
          <select
            name="section"
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="rounded-sm border-[#dedede] text-xs"
          >
            <option>(Choose Section)</option>
            <option value="interview 1">Interview 1</option>
            <option value="interview 2">Interview 2</option>
            <option value="exam 1">exam 1</option>
            <option value="exam 2">exam 2</option>
            <option value="RNF">RNF</option>``
          </select>
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

export default ScheduleModal;
