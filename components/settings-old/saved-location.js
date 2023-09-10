import React, { useEffect } from "react";
import HomeSmile2FillIcon from "remixicon-react/HomeSmile2FillIcon";
import EditFillIcon from "remixicon-react/EditFillIcon";
import More2LineIcon from "remixicon-react/More2LineIcon";
import DeleteBinLineIcon from "remixicon-react/DeleteBinLineIcon";
import MapOnlyShow from "../../components/map/only-show";
import { useTranslation } from "react-i18next";
import { AddressApi } from "../../api/main/address";
import { useContext } from "react";
import { MainContext } from "../../utils/contexts/MainContext";
import { addUserAddressId } from "../../redux/slices/order";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import RecordCircleLineIcon from "remixicon-react/RecordCircleLineIcon";
import CheckboxBlankCircleLineIcon from "remixicon-react/CheckboxBlankCircleLineIcon";
import { toast } from "react-toastify";

const SavedLocation = ({ addNew = true, setAddressData, setAddress }) => {
  const { t: tl } = useTranslation();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order, shallowEqual);
  const user = useSelector((state) => state.user.data, shallowEqual);
  const { getUser, address, setFindexAddress } = useContext(MainContext);
  const handleEdit = (e, data) => {
    e?.stopPropagation();
    setAddress({
      address: data.address,
      location: { lat: data.location.latitude, lng: data.location.longitude },
    });
    setAddressData({
      ...data,
      // name: user.firstname,
      // surname: user.lastname,
      // birth_date: user.birthday?.slice(0, 10),
      // gender: user.gender,
      // email: user.address_email,
      // passport_secret: user.passport_secret,
      // phone: user.address_phone,
      // passport_number: user.passport_number,
    });
    setFindexAddress(true);
  };
  const deleteAddress = (e, id) => {
    e?.stopPropagation();
    AddressApi.delete(id)
      .then(() => {
        getUser();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message);
      });
  };
  useEffect(() => {
    if (Boolean(address[0])) {
      dispatch(
        addUserAddressId({
          id: address[0].id,
          price: address[0].country?.delivery.price,
        })
      );
    }
  }, [Boolean(address[0])]);

  return (
    <>
      <div className="saved-location">
        {address?.map((data, key) => (
          <div
            key={key}
            className={`location-card ${
              order?.data?.user_address_id == data.id ? "active" : ""
            }`}
            onClick={() =>
              dispatch(
                addUserAddressId({
                  id: data.id,
                })
              )
            }
          >
            <div className="card-header">
              {/* <div className="logo">
                <HomeSmile2FillIcon size={22} />
              </div> */}
              <div className="name">
                {order?.data?.user_address_id == data.id ? (
                  <RecordCircleLineIcon color="#61DC00" size={20} />
                ) : (
                  <CheckboxBlankCircleLineIcon size={20} />
                )}
                <span>{data.title}</span>
              </div>
              {Boolean(key > 0) && (
                <div className="edit-btn">
                  <More2LineIcon size={22} />
                  <div className="edit-action">
                    <div
                      className="action-item"
                      onClick={(e) => handleEdit(e, data)}
                    >
                      <EditFillIcon size={20} />
                      <span>{tl("Edit")}</span>
                    </div>
                    <div
                      className="action-item"
                      onClick={(e) => deleteAddress(e, data.id)}
                    >
                      <DeleteBinLineIcon size={20} />
                      <span>{tl("Delete")}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="card-content">
              <ul>
                <li>
                  <strong>{`${data.name || ""} ${data.surname || ""}`}</strong>
                </li>
                <li>{data.email}</li>
                <li>{data.address}</li>
              </ul>
            </div>
            <div className="saved-address">
              <MapOnlyShow location={data.location} />
            </div>
          </div>
        ))}
      </div>

      {addNew && (
        <button className="btn-dark" onClick={() => setFindexAddress(true)}>
          {tl("Add location")}
        </button>
      )}
    </>
  );
};

export default SavedLocation;
