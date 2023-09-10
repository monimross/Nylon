import React from "react";
import HomeSmile2FillIcon from "remixicon-react/HomeSmile2FillIcon";
import EditFillIcon from "remixicon-react/EditFillIcon";
import More2LineIcon from "remixicon-react/More2LineIcon";
import DeleteBinLineIcon from "remixicon-react/DeleteBinLineIcon";
import MapOnlyShow from "../../components/map/only-show";
import { useTranslation } from "react-i18next";
import { AddressApi } from "../../api/main/address";
import { useContext } from "react";
import { MainContext } from "../../utils/contexts/MainContext";

const SavedLocation = ({ setOpen, setEditAddress, setLoader }) => {
  const { t: tl } = useTranslation();
  const { getUser, address } = useContext(MainContext);
  const handleEdit = (data) => {
    const title = data.title.split(",")[0];
    const extra = data.title.split(",")[1];
    setEditAddress({
      id: data.id,
      title,
      extra,
      address: data.address,
      location: {
        lat: data.location.latitude,
        lng: data.location.longitude,
      },
    });
    setOpen(true);
  };
  const deleteAddress = (id) => {
    setLoader(true);
    AddressApi.delete(id)
      .then(() => {
        getUser();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <>
      <div className="saved-location">
        {address?.map((data, key) => {
          return (
            <div key={key} className="location-card">
              <div className="card-header">
                <div className="logo">
                  <HomeSmile2FillIcon size={22} />
                </div>
                <div className="name">{data.title}</div>
                <div className="edit-btn">
                  <More2LineIcon size={22} />
                  <div className="edit-action">
                    <div
                      className="action-item"
                      onClick={() => handleEdit(data)}
                    >
                      <EditFillIcon size={20} />
                      <span>{tl("Edit")}</span>
                    </div>
                    <div
                      className="action-item"
                      onClick={() => deleteAddress(data.id)}
                    >
                      <DeleteBinLineIcon size={20} />
                      <span>{tl("Delete")}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-content">{data.address}</div>
              <div className="saved-address">
                <MapOnlyShow location={data.location} />
              </div>
            </div>
          );
        })}
      </div>
      <button className="btn-dark" onClick={() => setOpen(true)}>
        {tl("Add location")}
      </button>
    </>
  );
};

export default SavedLocation;
