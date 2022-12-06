import { IconRotate2, IconSquarePlus, IconX } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import Logo from "@/Logo";
import InterviewProgressModal from "@/Components/Modal/Applicants/InterviewProgressModal";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 500,
  },
  content: {
    padding: 0,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "800px",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("body");

const DetailModal = ({ modal, setModal, id }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [section, setSection] = useState("");
  const [jobName, setJobName] = useState("");
  const [salary, setSalary] = useState(0);
  const [applyDate, setApplyDate] = useState("");
  const [interviewId, setInterviewId] = useState("");
  const [status, setStatus] = useState("");

  const [modalDetailInterview, setModalDetailInterview] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(route("applicants.show", id)).then((res) => {
        const data = res.data[0];
        setFullName(data.name);
        setEmail(data.email);
        setMobileNumber(data.mobile_number);
        setInterviewDate(data.interview_date);
        setSection(data.section);
        setJobName(data.title);
        setSalary(data.salary);
        setApplyDate(data.apply_date);
        setInterviewId(data.interview_id);
        setStatus(data.status);
      });
    }
  }, [id]);

  const update = () => {
    axios.get(route("applicants.show", id)).then((res) => {
      const data = res.data[0];
      setFullName(data.name);
      setEmail(data.email);
      setMobileNumber(data.mobile_number);
      setInterviewDate(data.interview_date);
      setSection(data.section);
      setJobName(data.title);
      setSalary(data.salary);
      setApplyDate(data.apply_date);
      setInterviewId(data.interview_id);
      setStatus(data.status);
    });
  };

  const handleInterviewProgress = () => {
    setModalDetailInterview(true);
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
      <div className="flex justify-between p-4 text-xl border-b-2 border-b-[#dedede]">
        <h2 className="text-xl font-medium">Detail Data Applicant</h2>
        <span
          className={`px-1 text-sm font-semibold rounded text-[#fff] capitalize ${
            status == "graduated"
              ? "bg-green"
              : status == "progress"
              ? "bg-blue2"
              : "bg-red text-[#fff]"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="m-2 p-2 border border-[#dedede] rounded-sm">
        <div className="flex justify-between items-center">
          <Logo />
          <span>Date Apply: {moment(applyDate).format("L LTS")}</span>
        </div>
        <div className="flex justify-between items-start my-4 mr-32">
          <div className="grid gap-3">
            <div>
              <h2 className="text-sm font-semibold">Applicant</h2>
              <p className="text-sm">Full Name: {fullName}</p>
              <p className="text-sm">Email: {email}</p>
              <p className="text-sm">Mobile Number: {mobileNumber}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold">Job</h2>
              <p className="text-sm">Title: {jobName}</p>
              <p className="text-sm">
                Salary: Rp. {salary.toLocaleString("id-ID").replace(".", ",")}
              </p>
            </div>
          </div>
          <div className="grid gap-3">
            <div>
              <h2 className="text-sm font-semibold">
                Interview Date (Current)
              </h2>
              <p className="text-sm">{moment(interviewDate).format("L LTS")}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold">
                Interview Section (Current)
              </h2>
              <p className="text-sm">{section}</p>
            </div>
            <button
              onClick={handleInterviewProgress}
              className="bg-yellow font-semibold text-sm rounded-sm w-[150px] flex justify-center items-center hover:drop-shadow-xl transition duration-300"
            >
              <IconRotate2 size={16} />
              Interview Progress
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-row-reverse mt-4 p-4 gap-3 border-t border-t-[#dedede]">
        <button
          className="p-1 bg-[#888] rounded-sm flex gap-1 items-center text-[#fff]"
          onClick={() => setModal(false)}
        >
          <IconX size={14} />
          close
        </button>
      </div>
      <InterviewProgressModal
        modal={modalDetailInterview}
        setModal={setModalDetailInterview}
        interviewId={interviewId}
        status={status}
        updateDetail={update}
        id={id}
      />
    </Modal>
  );
};

export default DetailModal;
