import React, { useContext, useEffect, useState } from "react";
import GetPosition from "../map/get-position";
import GoogleMap from "../../components/map";
import CompassDiscoverLineIcon from "remixicon-react/CompassDiscoverLineIcon";
import { AddressApi } from "../../api/main/address";
import { getCurrentLocation } from "../../utils/getCurrentLocation";
import InputText from "../form/input-text";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { MainContext } from "../../utils/contexts/MainContext";
import RefetchSearch from "../form/refetch-search";
import countryService from "../../services/deliveryzone/country";
import regionService from "../../services/deliveryzone/region";
import cityService from "../../services/deliveryzone/city";
import { parseCookies } from "nookies";

const EnterAddress = ({
  setIsOpen,
  setOpen = () => {},
  editAddress,
  setEditAddress = () => {},
}) => {
  const [value, setValue] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [form, setForm] = useState({
    country_id: null,
    region_id: null,
    city_id: null,
  });
  const { t: tl } = useTranslation();
  const { getUser } = useContext(MainContext);

  async function fetchCountry(search) {
    const params = { search, status: 1, perPage: 10 };
    return countryService.get(params).then(({ data: { data } }) =>
      data.map((item) => ({
        label: item.name || "no name",
        value: item.id,
      }))
    );
  }
  async function fetchRegion(search) {
    const params = {
      search,
      status: 1,
      perPage: 10,
      country_id: form?.country_id,
    };
    return regionService.get(params).then(({ data: { data } }) =>
      data.map((item) => ({
        label: item.name || "no name",
        value: item.id,
      }))
    );
  }
  async function fetchCity(search) {
    const params = {
      search,
      status: 1,
      perPage: 10,
      region_id: form?.region_id,
    };
    return cityService.get(params).then(({ data: { data } }) =>
      data.map((item) => ({
        label: item.name || "no name",
        value: item.id,
      }))
    );
  }

  const addAddress = () => {
    if (!title) {
      toast.error(tl("Please enter address title"));
    } else {
      AddressApi.create({
        title,
        address: address?.address,
        location: `${address?.location.lat},${address?.location.lng}`,
        active: 0,
      })
        .then(() => {
          setOpen(false);
          setIsOpen(null);
          setEditAddress(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response?.data?.message);
        })
        .finally(() => {
          getUser();
        });
    }
  };
  const updateAddress = () => {
    if (!title) {
      toast.error(tl("Please enter address title"));
      return;
    }
    AddressApi.update(editAddress?.id, {
      title,
      address: value,
      location: `${address.location.lat},${address.location.lng}`,
      active: 0,
    })
      .then(() => {
        setOpen(false);
        setEditAddress(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data?.message);
      })
      .finally(() => {
        getUser();

        setValue("");
      });
  };
  const onFinish = () => {
    if (parseCookies()?.access_token) {
      if (editAddress) {
        updateAddress();
      } else {
        addAddress();
      }
    } else {
      toast.error("please.login.first");
    }
  };
  useEffect(() => {
    setValue(editAddress?.address);
    setTitle(editAddress?.title);

    return () => {
      setValue("");
      setTitle("");
    };
  }, [editAddress]);

  useEffect(() => {
    setValue(address?.address);
  }, [address]);

  const handleChange = (e) => {
    const { name, value } = e;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "country_id") {
      setForm((prev) => ({ ...prev, region: null, city: null }));
    }
    if (name === "region_id") {
      setForm((prev) => ({ ...prev, city: null }));
    }
  };

  return (
    <div className="enter-address">
      <div className="row">
        <div className="col-md-6">
          <InputText
            placeholder="Type here"
            label="Title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
      </div>
      <div className="enter-input">
        <div
          className="get-location"
          onClick={() => getCurrentLocation({ setAddress })}
        >
          <CompassDiscoverLineIcon size={26} />
        </div>
        <GetPosition
          setValue={setValue}
          value={value}
          setAddress={setAddress}
        />
        <button className="get-location" type="submit" onClick={onFinish}>
          {tl("Submit")}
        </button>
      </div>
      <div className="google-map">
        <GoogleMap address={address} setAddress={setAddress} />
      </div>
      {/* <div className="row">
        <div className="col-md-4">
          <RefetchSearch
            onChange={(e) => handleChange(e)}
            label="Country"
            placeholder="country"
            name="country_id"
            value={form?.country_id}
            fetchOptions={fetchCountry}
          />
        </div>
        <div className="col-md-4">
          <RefetchSearch
            onChange={(e) => handleChange(e)}
            label="Region"
            placeholder="region"
            name="region_id"
            value={form?.region_id}
            fetchOptions={fetchRegion}
            disabled={!Boolean(form?.country_id)}
            refetch={true}
          />
        </div>
        <div className="col-md-4">
          <RefetchSearch
            onChange={(e) => handleChange(e)}
            label="City"
            placeholder="city"
            name="city_id"
            value={form?.city_id}
            fetchOptions={fetchCity}
            disabled={!Boolean(form?.region_id)}
            refetch={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <InputText
            placeholder="Type here"
            label="Name"
            name="title"
            onChange={(e) => handleChange(e.target)}
            value={form?.title}
          />
        </div>
        <div className="col-md-3">
          <InputText
            placeholder="Type here"
            label="Entrence"
            name="entrence"
            onChange={(e) => handleChange(e.target)}
            value={form?.entrence}
          />
        </div>
        <div className="col-md-3">
          <InputText
            placeholder="Type here"
            label="Floor"
            name="floor"
            onChange={(e) => handleChange(e.target)}
            value={form?.floor}
          />
        </div>
        <div className="col-md-3">
          <InputText
            placeholder="Type here"
            label="Apartment"
            name="apartment"
            onChange={(e) => handleChange(e.target)}
            value={form?.apartment}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <InputText
            placeholder="Type here"
            label="Comment"
            name="comment"
            onChange={(e) => handleChange(e.target)}
            value={form?.comment}
          />
        </div>
        <button className="get-location" type="submit" onClick={onFinish}>
          {tl("Submit")}
        </button>
      </div> */}
    </div>
  );
};

export default EnterAddress;
