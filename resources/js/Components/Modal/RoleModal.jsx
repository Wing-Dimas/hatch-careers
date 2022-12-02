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

const JobModal = ({ modal, setModal, mode, setMode, id }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (mode == "edit") {
      axios.get(route("roles.edit", id)).then((res) => {
        const role = res.data;
        setName(role.name);
      });
    } else {
      setName("");
    }
  }, [mode, id]);

  const handleSave = async () => {
    if (mode == "edit") {
      Inertia.put(route("roles.update", id), {
        name,
      });
      await Swal.fire(
        "Berhasil Diupdate!",
        "Data perkerjaan berhasil di update",
        "success"
      );
    } else {
      Inertia.post(route("roles"), {
        name,
      });
      await Swal.fire(
        "Berhasil Ditambah!",
        "Data role berhasil di tambah",
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
        {mode == "edit" ? "Edit Role" : "Create New Job"}
      </h2>
      <div className="mt-4">
        <div className="grid gap-3 grid-cols-1">
          <label htmlFor="location" className="text-sm font-bold">
            Name
          </label>
          <input
            name="name"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-sm border-[#dedede] text-xs"
          ></input>
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
