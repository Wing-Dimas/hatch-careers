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

const InterviewProgressModal = ({
  modal,
  setModal,
  id,
  interviewId,
  status,
  updateDetail,
}) => {
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

  const handleStatus = (stat) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You can't revert update",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${stat}!`,
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Inertia.put(route("applicants.update.interview", interviewId), {
          status: stat,
        });
        await Swal.fire(`${stat}!`, `Applicant has been ${stat}.`, "success");
        update();
        updateDetail();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your data applicant is safe :)", "error");
      }
    });
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
        <h2 className="text-xl font-medium">Schdule History</h2>
        <div className="flex gap-3 justify-end">
          {status == "progress" && (
            <>
              <button
                onClick={handleStatus.bind(this, "graduated")}
                className="flex justify-center items-center gap-2 text-sm px-2 bg-green rounded-sm text-[#fff]"
              >
                <IconTrophy size={16} color="#fff" /> Graduate
              </button>
              <button
                onClick={handleStatus.bind(this, "terminate")}
                className="flex justify-center items-center gap-2 text-sm px-2 bg-red rounded-sm text-[#fff]"
              >
                <IconCircleOff size={16} color="#fff" /> Terminate
              </button>
            </>
          )}
        </div>
      </div>
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
                Status
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

export default InterviewProgressModal;
