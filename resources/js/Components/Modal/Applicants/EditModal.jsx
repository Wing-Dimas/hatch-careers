import { IconCircleOff, IconTrophy, IconX } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
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

const EditModal = ({ modal, setModal, id, interviewId }) => {
  const [applicants, setApplicants] = useState([{}]);

  useEffect(() => {
    if (id) {
      axios.get(route("applicants.show.schedule", id)).then((res) => {
        const data = res.data;
        setApplicants(data);
      });
    }
  }, [id]);

  const update = () => {
    axios.get(route("applicants.show.schedule", id)).then((res) => {
      const data = res.data;
      setApplicants(data);
    });
  };

  const handleChange = (status, id) => {
    Inertia.put(route("applicants.update.detailInterview", id), {
      status,
    });
    update();
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
      <h2 className="p-4 text-xl border-b-2 border-b-[#dedede] font-medium">
        Edit Schedule
      </h2>

      <div className="p-4">
        <table className="table-auto w-full border border-[#dedede] border-collapse">
          <thead>
            <tr>
              <th className="border border-[#dedede] border-collapse p-2 text-sm text-start">
                Section
              </th>
              <th className="border border-[#dedede] border-collapse p-2 text-sm text-start">
                Interview Date
              </th>
              <th className="border border-[#dedede] border-collapse p-2 text-sm text-start">
                Current Status
              </th>
              <th className="border border-[#dedede] border-collapse p-2 text-sm">
                Change Status
              </th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant, ind) => (
              <tr key={ind}>
                <td className="border border-[#dedede] border-collapse p-2 text-sm">
                  {applicant.section}
                </td>
                <td className="border border-[#dedede] border-collapse p-2 text-sm">
                  {applicant.interview_date}
                </td>
                <td className="border border-[#dedede] border-collapse p-2 text-sm">
                  <span
                    className={`px-1 font-semibold rounded text-[#fff] capitalize ${
                      applicant.status == "expired"
                        ? "bg-[#888]"
                        : applicant.status == "progress"
                        ? "bg-blue2"
                        : applicant.status == "complete"
                        ? "bg-green"
                        : "bg-yellow text-[#000]"
                    }`}
                  >
                    {applicant.status}
                  </span>
                </td>
                <td className="border border-[#dedede] border-collapse p-2 text-sm">
                  <div className="grid gap-3 grid-cols-1">
                    <select
                      name="status"
                      id="status"
                      onChange={(e) => {
                        handleChange(e.target.value, applicant.id);
                      }}
                      className="rounded-sm border-[#dedede] text-xs"
                    >
                      <option value={""}>(Choose Status)</option>
                      <option value="expired">expired</option>
                      <option value="progress">progress</option>
                      <option value="reschedule">reschedule</option>
                      <option value="complete">complete</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </Modal>
  );
};

export default EditModal;
