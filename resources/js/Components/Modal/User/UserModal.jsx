import { IconSquarePlus, IconX } from "@tabler/icons";
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

const UserModal = ({ modal, setModal, mode, setMode, id, setId, roles }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (mode == "edit" && id != "") {
      axios.get(route("users.edit", id)).then((res) => {
        const user = res.data;
        setName(user.name);
        setEmail(user.email);
        setRole(user.role_id);
        setPassword("");
        setNewPassword("");
      });
    } else {
      setName("");
      setEmail("");
      setRole("");
      setPassword("");
    }
  }, [mode, id]);

  const handleSave = async () => {
    if (mode == "edit") {
      Inertia.put(route("users.update", id), {
        name,
        email,
        password,
        newPassword,
        role_id: role,
      });
      setId("");
    } else {
      Inertia.post(route("users"), {
        name,
        email,
        password,
        role_id: role,
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
        {mode == "edit" ? "Edit User" : "Create New User"}
      </h2>
      <div className="mt-4">
        <div className="grid gap-3 grid-cols-1">
          <label htmlFor="name" className="text-sm font-bold">
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
        <div className="grid gap-3 grid-cols-1">
          <label htmlFor="password" className="text-sm font-bold">
            {mode == "edit" ? "Old Password" : "Password"}
          </label>
          <input
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-sm border-[#dedede] text-xs"
          ></input>
        </div>
        {mode == "edit" ? (
          <div className="grid gap-3 grid-cols-1">
            <label htmlFor="newPassword" className="text-sm font-bold">
              New Password
            </label>
            <input
              name="newPassword"
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="rounded-sm border-[#dedede] text-xs"
            ></input>
          </div>
        ) : (
          ""
        )}
        <div className="grid gap-3 grid-cols-1">
          <label htmlFor="email" className="text-sm font-bold">
            Email
          </label>
          <input
            name="email"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-sm border-[#dedede] text-xs"
          ></input>
        </div>
        <div className="grid gap-3 grid-cols-1">
          <label htmlFor="role" className="text-sm font-bold">
            Role
          </label>
          <select
            name="role"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-sm border-[#dedede] text-xs"
          >
            <option>(Choose Role)</option>
            {roles.map((role, ind) => (
              <option value={role.id} key={ind}>
                {role.name}
              </option>
            ))}
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

export default UserModal;
