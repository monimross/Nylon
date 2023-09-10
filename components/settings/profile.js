import React, { useState } from "react";
import CustomSelect from "../form/custom-select";
import InputDate from "../form/input-date";
import InputPassword from "../form/input-password";
import InputText from "../form/input-text";
import PencilLineIcon from "remixicon-react/PencilLineIcon";
import { useTranslation } from "react-i18next";
import { UploadApi } from "../../api/main/upload";
import { toast } from "react-toastify";
import { UserApi } from "../../api/main/user";
import { imgBaseUrl } from "../../constants";

const Profile = ({ userData, getUser }) => {
  const { t: tl } = useTranslation();
  const gender = [
    { id: "male", value: tl("Male") },
    { id: "female", value: tl("Female") },
  ];
  const [validate, setValidate] = useState(null);
  const [user, setUser] = useState(userData);
  const [update, setUpdate] = useState({
    firstname: user?.firstname,
    lastname: user?.lastname,
    gender: user?.gender,
    birthday: user?.birthday,
  });
  const [avatar, setAvatar] = useState(null);
  const [uploadImages, setUploadImages] = useState([]);

  const handleChange = (event) => {
    const { target } = event;
    const value = target.type === "radio" ? target.checked : target.value;
    const { name } = target;
    setUpdate({
      ...update,
      [name]: value,
    });
  };
  const handleGender = (e) => {
    setUpdate({ ...update, gender: e.id });
    setUser({
      ...user,
      gender: e.id,
    });
  };
  const checkPassword = () => {
    if (update.password)
      if (update.password === update.password_confirmation) {
        setValidate("check");
      } else {
        setValidate("checked");
      }
  };
  const fileSelectedHandler = (event) => {
    if (
      event.target.files[0].type === "image/jpeg" ||
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/svg"
    ) {
      const images = new FormData();
      images.append("image", event.target.files[0]);
      images.append("type", "users");
      UploadApi.create(images)
        .then((res) => {
          setUploadImages(res.data.title);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Image upload failed");
        });
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error(tl("You need to select jpeg, png or svg file"));
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (uploadImages?.length) update.images = [uploadImages];
    UserApi.update(update)
      .then(() => {
        getUser();
        toast.success("Profile data updated");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data?.message);
      });
  };
  const findHTTPS = user?.img?.includes("https");
  return (
    <div className="profile">
      <div className="avatar">
        {avatar ? (
          <img src={avatar} alt="avatar" />
        ) : findHTTPS ? (
          <img src={user?.img} alt="avatar" />
        ) : user?.img ? (
          <img src={imgBaseUrl + user?.img} alt="avatar" />
        ) : (
          <div className="no-avatar">{user?.firstname.slice(0, 1)}</div>
        )}
        <label>
          <input
            type="file"
            style={{ display: "none" }}
            onChange={fileSelectedHandler}
            multiple={false}
          />
          <div className="edit">
            <PencilLineIcon size={22} color="#fff" />
          </div>
        </label>
      </div>
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="info-wrapper">
          <div className="general-info">
            <div className="title">{tl("General info")}</div>
            <InputText
              onChange={handleChange}
              label="First name"
              placeholder="John"
              name="firstname"
              value={update?.firstname}
            />
            <InputText
              name="lastname"
              value={update?.lastname}
              onChange={handleChange}
              label="Last name"
              placeholder="Doe"
            />
            <InputText
              value={user?.email}
              label="Email"
              placeholder="Email"
              disabled={true}
            />
            <CustomSelect
              onChange={handleGender}
              options={gender}
              label="Geder"
              placeholder="Male"
              value={user?.gender}
            />
            <InputDate
              onChange={handleChange}
              name="birthday"
              value={update?.birthday?.slice(0, 10)}
              label="Year of birth"
            />
          </div>
          <div className="password">
            <div className="title">{tl("Password")}</div>
            <InputPassword
              name="password"
              label="New password"
              placeholder="*******"
              onChange={handleChange}
            />
            <InputPassword
              name="password_confirmation"
              label="Confirm new password"
              placeholder="*******"
              onChange={handleChange}
              onBlur={checkPassword}
              className={
                validate === "check"
                  ? "success"
                  : validate === "checked"
                  ? "error"
                  : ""
              }
            />
          </div>
        </div>
        <button
          disabled={validate === "checked"}
          type="submit"
          className="btn-dark"
        >
          {tl("Save")}
        </button>
      </form>
    </div>
  );
};

export default Profile;
