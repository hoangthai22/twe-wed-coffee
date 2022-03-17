/* eslint-disable react/prop-types */
// @mui material components
// import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { useEffect, useState } from "react";

// Soft UI Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";
import Tooltip from "@mui/material/Tooltip";
// import MDBadge from "components/MDBadge";

export const Avatars = ({ image }) => (
  <Tooltip placeholder="bottom">
    <MDAvatar
      src={image}
      size="sm"
      sx={{
        border: ({ borders: { borderWidth }, palette: { white } }) =>
          `${borderWidth[1]} solid ${white.main}`,
        cursor: "pointer",
        position: "relative",

        "&:not(:first-of-type)": {
          ml: -1,
        },

        "&:hover, &:focus": {
          zIndex: "10",
        },
      }}
    />
  </Tooltip>
);
export default function data() {
  const [todayBooking, setTodayBooking] = useState([]);
  useEffect(() => {
    axios
      .get("https://theweekendexpertise.azurewebsites.net/done?pageIndex=1&pageSize=5")
      .then((res) => {
        console.log(res.data);
        console.log(todayBooking);
        setTodayBooking(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const Author = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="lg" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium" fontSize="15px">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  function dataTable() {
    return todayBooking.map((item, index) => ({
      stt: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          fontSize="15px"
        >
          {index + 1}
        </MDTypography>
      ),
      session: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          fontSize="15px"
        >
          {item.subjectName}
        </MDTypography>
      ),
      member: (
        <MDBox display="flex" py={2}>
          {item.listMemberImage.map((image) => (
            <Avatars image={image} />
          ))}
        </MDBox>
      ),
      mentor: <Author image={item.mentorImage} name={item.mentorName} />,
      price: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          fontSize="15px"
        >
          {item.price}.000 VND
        </MDTypography>
      ),

      location: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          fontSize="15px"
        >
          {item.cafeStreet}, {item.cafeDistric}
        </MDTypography>
      ),
      date_time: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          fontSize="15px"
        >
          {item.date}
        </MDTypography>
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={item.status ? "Confirm" : "2"}
            color="success"
            variant="gradient"
            size="sm"
            fontSize="15px"
          />
        </MDBox>
      ),
      action: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          fontSize="15px"
        >
          <MDButton color="success">Confirm</MDButton>
          <MDButton color="error">Cancel</MDButton>
        </MDTypography>
      ),
    }));
  }
  return {
    columns: [
      { Header: "STT", accessor: "stt", align: "left" },
      { Header: "mentor", accessor: "mentor", align: "center" },
      { Header: "members", accessor: "member", width: "25%", align: "left" },
      { Header: "date/time", accessor: "date_time", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
    ],

    rows: dataTable(),
  };
}
